import { NextRequest, NextResponse } from 'next/server';
import { mockDb } from '@/lib/db/mock-db';

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone } = await request.json();
    const newUser = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone,
      role: 'CUSTOMER' as const,
      createdAt: new Date().toISOString(),
    };
    mockDb.getCustomers().push(newUser);
    return NextResponse.json({ success: true, data: { user: newUser, token: 'mock-jwt-token' } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Registration failed' }, { status: 500 });
  }
}
