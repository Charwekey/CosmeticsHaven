import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const customers = mockDb.getCustomers();
  return NextResponse.json({ success: true, count: customers.length, data: customers });
}
