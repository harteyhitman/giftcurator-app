import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    totalEvents: { value: 12, trend: 0.1 },
    activeBeneficiaries: { value: 5 },
    upcomingEvents: { value: 3 },
    subscriptionStatus: { value: 'Active' },
  });
}
