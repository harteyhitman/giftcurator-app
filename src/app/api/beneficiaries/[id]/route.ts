import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (id === '1') {
    return NextResponse.json({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      mobile: '123-456-7890',
      dob: '1990-01-01',
      address: '123 Main St, Anytown, USA',
      relationship: 'Friend',
      gender: 'male',
      upcomingEvents: [
        {
          id: '1',
          eventName: 'John Doe\'s Birthday',
          eventType: 'Birthday',
          daysRemaining: 5,
          progress: 0.5,
        },
      ],
      pastGifts: [
        {
          id: '1',
          giftName: 'Amazon Gift Card',
          date: '2022-12-25',
          amount: 50,
        },
      ],
      notes: 'Loves hiking and reading.',
      timeline: [
        { id: '1', event: 'Beneficiary added', date: '2023-01-01' },
        { id: '2', event: 'Gift sent', date: '2022-12-25' },
      ],
    });
  }
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}
