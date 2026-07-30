import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const orders = mockDb.getOrders();
  return NextResponse.json({ success: true, count: orders.length, data: orders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.customerName || !body.deliveryAddress || !body.orderItems?.length) {
      return NextResponse.json({ success: false, message: 'Missing order information or items' }, { status: 400 });
    }
    const newOrder = mockDb.createOrder(body);
    return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to place order' }, { status: 500 });
  }
}
