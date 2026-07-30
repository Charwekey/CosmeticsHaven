import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { status } = await request.json();
  const updated = mockDb.moderateReview(id, status);
  return NextResponse.json({ success: true, data: updated });
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return NextResponse.json({ success: true, message: `Review ${id} deleted` });
}
