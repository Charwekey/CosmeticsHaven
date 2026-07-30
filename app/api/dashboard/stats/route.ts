import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const stats = mockDb.getDashboardStats();
  return NextResponse.json({ success: true, data: stats });
}
