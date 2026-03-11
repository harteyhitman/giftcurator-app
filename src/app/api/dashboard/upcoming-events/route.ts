import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      eventName: 'John Doe\'s Birthday',
      eventType: 'Birthday',
      beneficiaryName: 'John Doe',
      daysRemaining: 5,
      progress: 0.5,
    },
    {
      id: '2',
      eventName: 'Jane Smith\'s Wedding',
      eventType: 'Wedding',
      beneficiaryName: 'Jane Smith',
      daysRemaining: 12,
      progress: 0.2,
    },
    {
      id: '3',
      eventName: 'Peter Jones\'s Anniversary',
      eventType: 'Anniversary',
      beneficiaryName: 'Peter Jones',
      daysRemaining: 20,
      progress: 0.8,
    },
  ]);
}
