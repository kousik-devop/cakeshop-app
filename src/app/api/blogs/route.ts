import { NextResponse } from 'next/server';
import { initialBlogs } from '@/data/mockData';

export async function GET() {
  return NextResponse.json({ success: true, count: initialBlogs.length, data: initialBlogs });
}
