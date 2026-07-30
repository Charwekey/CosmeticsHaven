import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const productId = searchParams.get('productId') || undefined;
  const reviews = mockDb.getReviews(productId);
  return NextResponse.json({ success: true, count: reviews.length, data: reviews });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.productId || !body.rating || !body.comment || !body.userName) {
      return NextResponse.json({ success: false, message: 'Missing review fields' }, { status: 400 });
    }
    const review = mockDb.addReview(body);
    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Failed to submit review' }, { status: 500 });
  }
}
