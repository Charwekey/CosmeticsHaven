import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email } = await request.json();
  return NextResponse.json({
    success: true,
    message: `Password reset instructions sent to ${email}`,
  });
}
