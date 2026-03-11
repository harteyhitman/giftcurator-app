import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    {
      id: '1',
      title: 'John Doe\'s Birthday',
      date: '2024-08-10',
    },
    {
      id: '2',
      title: 'Jane Smith\'s Wedding',
      date: '2024-08-20',
    },
  ]);
}

export async function POST(request: Request) {
  const data = await request.json();
  return NextResponse.json({ id: '123', ...data });
}
