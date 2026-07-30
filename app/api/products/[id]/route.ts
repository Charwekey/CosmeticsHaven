import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = mockDb.getProductById(id);
  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: product });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const updates = await request.json();
    const updated = mockDb.updateProduct(id, updates);
    if (!updated) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to update product' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const deleted = mockDb.deleteProduct(id);
  return NextResponse.json({ success: true, message: 'Product deleted successfully' });
}
