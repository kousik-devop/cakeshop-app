import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { initialShopSettings } from '@/data/mockData';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const settingsCol = db.collection('settings');

    let settings = await settingsCol.findOne({ id: 'store_settings' });

    if (!settings) {
      const doc = { id: 'store_settings', ...initialShopSettings };
      await settingsCol.insertOne(doc);
      return NextResponse.json({ success: true, data: initialShopSettings });
    }

    const { _id, id, ...data } = settings;
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('MongoDB GET settings error:', error);
    return NextResponse.json({ success: true, data: initialShopSettings });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db('sweetdelightcakes');
    const settingsCol = db.collection('settings');

    await settingsCol.updateOne(
      { id: 'store_settings' },
      { $set: body },
      { upsert: true }
    );

    return NextResponse.json({ success: true, data: body });
  } catch (error) {
    console.error('MongoDB POST settings error:', error);
    return NextResponse.json({ success: false, error: 'Failed to update settings' }, { status: 500 });
  }
}
