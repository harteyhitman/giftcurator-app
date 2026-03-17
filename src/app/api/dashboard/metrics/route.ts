import { NextRequest, NextResponse } from 'next/server';
import { startOfDay } from 'date-fns';

import { getAuthorizedHeaders, safeBackendFetch } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [eventsResult, beneficiariesResult, profileResult] = await Promise.all([
    safeBackendFetch<Array<{ date: string }>>('/events', request),
    safeBackendFetch<Array<unknown>>('/beneficiaries', request),
    safeBackendFetch<{ subscriptions?: Array<{ status: string }> }>('/users/me', request),
  ]);

  const events = eventsResult.ok ? eventsResult.data : [];
  const beneficiaries = beneficiariesResult.ok ? beneficiariesResult.data : [];
  const profile = profileResult.ok ? profileResult.data : { subscriptions: undefined };

  const today = startOfDay(new Date()).getTime();
  const upcomingEvents = Array.isArray(events)
    ? events.filter((event) => new Date(event.date).getTime() >= today)
    : [];
  const latestSubscription = profile?.subscriptions?.[0];

  return NextResponse.json({
    totalEvents: { value: Array.isArray(events) ? events.length : 0 },
    activeBeneficiaries: { value: Array.isArray(beneficiaries) ? beneficiaries.length : 0 },
    upcomingEvents: { value: upcomingEvents.length },
    subscriptionStatus: { value: latestSubscription?.status ?? 'No plan' },
  });
}
