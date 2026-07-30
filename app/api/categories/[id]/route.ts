import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = mockDb.getCategoryById(id);
  if (!category) {
    return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: category });
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = mockDb.getCategoryById(id);
  if (!category) {
    return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
  }
  const body = await request.json();
  Object.assign(category, body);
  return NextResponse.json({ success: true, data: category });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ success: true, message: `Category ${id} deleted` });
}
