import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const recentOrders = mockDb.getOrders().slice(0, 5);
  return NextResponse.json({ success: true, count: recentOrders.length, data: recentOrders });
}
