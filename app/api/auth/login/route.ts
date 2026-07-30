import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const users = mockDb.getCustomers();
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      data: {
        user,
        token: 'mock-jwt-token-cosmeticshaven-2026',
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Login failed' }, { status: 500 });
  }
}
