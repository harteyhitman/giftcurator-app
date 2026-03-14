import { NextRequest, NextResponse } from 'next/server';

import { READ_NOTIFICATIONS_COOKIE, parseReadNotificationIds } from '@/lib/notifications';

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as { ids?: string[] };
  const existingIds = parseReadNotificationIds(
    request.cookies.get(READ_NOTIFICATIONS_COOKIE)?.value,
  );

  for (const id of body.ids ?? []) {
    if (typeof id === 'string') {
      existingIds.add(id);
    }
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(READ_NOTIFICATIONS_COOKIE, JSON.stringify(Array.from(existingIds)), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
