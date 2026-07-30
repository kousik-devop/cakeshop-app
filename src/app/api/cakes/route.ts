import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { initialCakes } from '@/data/mockData';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const cakesCollection = db.collection('cakes');

    let cakes = await cakesCollection.find({}).toArray();

    if (!cakes || cakes.length === 0) {
      const cleanInitial = initialCakes.map((c) => ({ ...c }));
      await cakesCollection.insertMany(cleanInitial);
      cakes = cleanInitial as any;
    }

    const formattedCakes = cakes.map(({ _id, ...rest }) => rest);
    return NextResponse.json({ success: true, count: formattedCakes.length, data: formattedCakes });
  } catch (error) {
    console.error('MongoDB GET cakes error, using fallback:', error);
    return NextResponse.json({ success: true, count: initialCakes.length, data: initialCakes });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const cakesCollection = db.collection('cakes');

    const newCake = {
      id: body.id || `cake-${Date.now()}`,
      ...body,
    };

    await cakesCollection.updateOne(
      { id: newCake.id },
      { $set: newCake },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: newCake }, { status: 201 });
  } catch (error) {
    console.error('MongoDB POST cake error:', error);
    return NextResponse.json({ success: false, error: 'Database save error' }, { status: 500 });
  }
}
