import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = mockDb.getCustomerById(id);
  if (!customer) {
    return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
  }
  const orders = mockDb.getOrders().filter((o) => o.userId === id);
  return NextResponse.json({ success: true, data: { ...customer, orders } });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = mockDb.getCustomerById(id);
  if (!customer) {
    return NextResponse.json({ success: false, message: 'Customer not found' }, { status: 404 });
  }
  const body = await request.json();
  Object.assign(customer, body);
  return NextResponse.json({ success: true, data: customer });
}
