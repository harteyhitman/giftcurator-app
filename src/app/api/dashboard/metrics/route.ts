import { NextRequest, NextResponse } from 'next/server';
import { startOfDay } from 'date-fns';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [eventsResponse, beneficiariesResponse, profileResponse] = await Promise.all([
    fetch(buildApiUrl('/events'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/beneficiaries'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/users/me'), { headers, cache: 'no-store' }),
  ]);

  const [events, beneficiaries, profile] = await Promise.all([
    eventsResponse.json(),
    beneficiariesResponse.json(),
    profileResponse.json(),
  ]);

  const today = startOfDay(new Date()).getTime();
  const upcomingEvents = events.filter(
    (event: { date: string }) => new Date(event.date).getTime() >= today,
  );
  const latestSubscription = profile.subscriptions?.[0];

  return NextResponse.json({
    totalEvents: { value: events.length },
    activeBeneficiaries: { value: beneficiaries.length },
    upcomingEvents: { value: upcomingEvents.length },
    subscriptionStatus: { value: latestSubscription?.status ?? 'No plan' },
  });
}
