import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { initialCategories } from '@/data/mockData';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const categoriesCol = db.collection('categories');

    let categories = await categoriesCol.find({}).toArray();

    if (!categories || categories.length === 0) {
      const cleanInitial = initialCategories.map((c) => ({ ...c }));
      await categoriesCol.insertMany(cleanInitial);
      categories = cleanInitial as any;
    }

    const formatted = categories.map(({ _id, ...rest }) => rest);
    return NextResponse.json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    console.error('MongoDB GET categories error:', error);
    return NextResponse.json({ success: true, count: initialCategories.length, data: initialCategories });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const categoriesCol = db.collection('categories');

    const categoryDoc = {
      id: body.id || `cat-${Date.now()}`,
      slug: body.slug || (body.name ? body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') : `cat-${Date.now()}`),
      ...body,
    };

    await categoriesCol.updateOne(
      { id: categoryDoc.id },
      { $set: categoryDoc },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: categoryDoc }, { status: 200 });
  } catch (error) {
    console.error('MongoDB POST category error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update category' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing category id' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const categoriesCol = db.collection('categories');

    await categoriesCol.deleteOne({ id });
    return NextResponse.json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error('MongoDB DELETE category error:', error);
    return NextResponse.json({ success: false, error: 'Database delete error' }, { status: 500 });
  }
}
