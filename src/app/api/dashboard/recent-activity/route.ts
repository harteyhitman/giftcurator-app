import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      activity: 'New beneficiary added: John Doe',
      timestamp: '2023-03-01T12:00:00Z',
    },
    {
      id: '2',
      activity: 'Event created: Jane Smith\'s Wedding',
      timestamp: '2023-03-01T11:00:00Z',
    },
    {
      id: '3',
      activity: 'Gift selected for Peter Jones\'s Anniversary',
      timestamp: '2023-03-01T10:00:00Z',
    },
    {
      id: '4',
      activity: 'Subscription changed to Pro',
      timestamp: '2023-03-01T09:00:00Z',
    },
  ]);
}
