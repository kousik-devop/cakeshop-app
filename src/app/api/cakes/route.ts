import { NextResponse } from 'next/server';
import { initialCakes } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({ success: true, count: initialCakes.length, data: initialCakes });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newCake = {
      id: `cake-${Date.now()}`,
      ...body,
    };
    return NextResponse.json({ success: true, data: newCake }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid JSON payload' }, { status: 400 });
  }
}
