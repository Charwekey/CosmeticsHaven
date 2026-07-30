import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const users = mockDb.getCustomers();
  return NextResponse.json({ success: true, data: users[0] });
}
