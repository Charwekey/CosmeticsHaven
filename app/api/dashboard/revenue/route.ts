import { NextResponse } from 'next/server';

export async function GET() {
  const revenueTrend = [
    { date: 'Jul 20', revenue: 1450, orders: 4 },
    { date: 'Jul 22', revenue: 2100, orders: 7 },
    { date: 'Jul 24', revenue: 1890, orders: 5 },
    { date: 'Jul 26', revenue: 3400, orders: 11 },
    { date: 'Jul 28', revenue: 2950, orders: 9 },
    { date: 'Jul 29', revenue: 4120, orders: 14 },
  ];
  return NextResponse.json({ success: true, data: revenueTrend });
}
