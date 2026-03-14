import { randomUUID } from 'crypto';

import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function POST(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json()) as {
    phone: string;
    preferredTime?: string;
    reason?: string;
  };

  if (!body.phone || body.phone.trim().length < 10) {
    return NextResponse.json({ message: 'A valid phone number is required.' }, { status: 400 });
  }

  const profileResponse = await fetch(buildApiUrl('/users/me'), {
    headers,
    cache: 'no-store',
  });
  const profile = await profileResponse.json();

  return NextResponse.json({
    success: true,
    requestId: randomUUID(),
    requestedAt: new Date().toISOString(),
    callbackWindowMinutes: 15,
    summary: `Callback request created for ${profile.firstName ?? 'your'} account at ${body.phone.trim()}.`,
    preferredTime: body.preferredTime?.trim() || 'As soon as possible',
    reason: body.reason?.trim() || 'General support',
  });
}
