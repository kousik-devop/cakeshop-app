import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const cakesCollection = db.collection('cakes');

    const cakes = await cakesCollection.find({}).toArray();
    const formattedCakes = cakes.map(({ _id, ...rest }) => rest);

    return NextResponse.json({ success: true, count: formattedCakes.length, data: formattedCakes });
  } catch (error) {
    console.error('MongoDB GET cakes error:', error);
    return NextResponse.json({ success: true, count: 0, data: [] });
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ success: false, error: 'Missing cake id' }, { status: 400 });

    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const cakesCollection = db.collection('cakes');

    await cakesCollection.deleteOne({ id });
    return NextResponse.json({ success: true, message: 'Cake deleted successfully' });
  } catch (error) {
    console.error('MongoDB DELETE cake error:', error);
    return NextResponse.json({ success: false, error: 'Database delete error' }, { status: 500 });
  }
}
