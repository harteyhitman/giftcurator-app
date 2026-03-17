import { startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { getAuthorizedHeaders, safeBackendFetch } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [eventsResult, beneficiariesResult, profileResult] = await Promise.all([
    safeBackendFetch<Array<{ date: string }>>('/events', request),
    safeBackendFetch<Array<unknown>>('/beneficiaries', request),
    safeBackendFetch<{ subscriptions?: unknown[] }>('/users/me', request),
  ]);

  const events = eventsResult.ok && Array.isArray(eventsResult.data) ? eventsResult.data : [];
  const beneficiaries = beneficiariesResult.ok && Array.isArray(beneficiariesResult.data) ? beneficiariesResult.data : [];
  const profile = profileResult.ok ? profileResult.data : { subscriptions: undefined };
  const today = startOfDay(new Date()).getTime();
  const upcomingEvents = events.filter((event) => new Date(event.date).getTime() >= today);

  return NextResponse.json([
    { name: 'Beneficiaries', value: beneficiaries.length },
    { name: 'Total Events', value: events.length },
    { name: 'Upcoming Events', value: upcomingEvents.length },
    { name: 'Subscriptions', value: profile?.subscriptions?.length ?? 0 },
  ]);
}
