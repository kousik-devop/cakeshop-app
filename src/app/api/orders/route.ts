import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ success: true, message: 'Orders REST API active' });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const orderNum = `SDC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      createdAt: new Date().toISOString(),
      status: 'Accepted',
      ...body,
    };
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid order payload' }, { status: 400 });
  }
}
