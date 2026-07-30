import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const topProducts = mockDb.getProducts().slice(0, 5);
  return NextResponse.json({ success: true, count: topProducts.length, data: topProducts });
}
