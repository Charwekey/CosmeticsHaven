import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const sort = searchParams.get('sort') || undefined;

  const products = mockDb.getProducts(category, search, sort);
  return NextResponse.json({ success: true, count: products.length, data: products });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.name || !body.price || !body.categoryId) {
      return NextResponse.json({ success: false, message: 'Missing required product fields' }, { status: 400 });
    }
    const newProduct = mockDb.addProduct(body);
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to create product' }, { status: 500 });
  }
}
