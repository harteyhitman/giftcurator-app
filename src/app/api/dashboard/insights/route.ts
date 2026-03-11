import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
    { name: 'Gifts Sent', value: 45 },
    { name: 'Wishlist Items', value: 20 },
    { name: 'Upcoming Events', value: 15 },
    { name: 'Subscriptions', value: 10 },
  ]);
}
