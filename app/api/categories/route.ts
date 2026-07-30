import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET() {
  const categories = mockDb.getCategories();
  return NextResponse.json({ success: true, count: categories.length, data: categories });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.slug) {
      return NextResponse.json({ success: false, message: 'Category name and slug required' }, { status: 400 });
    }
    const newCategory = mockDb.addCategory(body);
    return NextResponse.json({ success: true, data: newCategory }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create category' }, { status: 500 });
  }
}
