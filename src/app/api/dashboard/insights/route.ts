import { startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

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

  return NextResponse.json([
    { name: 'Beneficiaries', value: beneficiaries.length },
    { name: 'Total Events', value: events.length },
    { name: 'Upcoming Events', value: upcomingEvents.length },
    { name: 'Subscriptions', value: profile.subscriptions?.length ?? 0 },
  ]);
}
