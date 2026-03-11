import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
      relationship: 'Friend',
      dob: '1990-01-01',
      upcomingEvents: 2,
      createdAt: '2023-01-01T12:00:00Z',
    },
    {
      id: '2',
      firstName: 'Jane',
      lastName: 'Smith',
      relationship: 'Family',
      dob: '1992-05-10',
      upcomingEvents: 1,
      createdAt: '2023-02-01T12:00:00Z',
    },
  ]);
}
