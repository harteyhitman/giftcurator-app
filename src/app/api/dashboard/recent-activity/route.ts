import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const [beneficiariesResponse, eventsResponse, profileResponse] = await Promise.all([
    fetch(buildApiUrl('/beneficiaries'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/events'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/users/me'), { headers, cache: 'no-store' }),
  ]);

  const [beneficiaries, events, profile] = await Promise.all([
    beneficiariesResponse.json(),
    eventsResponse.json(),
    profileResponse.json(),
  ]);

  const activities = [
    ...beneficiaries.map((beneficiary: any) => ({
      id: `beneficiary-${beneficiary.id}`,
      activity: `New beneficiary added: ${beneficiary.firstName} ${beneficiary.lastName}`,
      timestamp: beneficiary.createdAt,
    })),
    ...events.map((event: any) => ({
      id: `event-${event.id}`,
      activity: `Event created: ${event.title}`,
      timestamp: event.createdAt,
    })),
    ...(profile.subscriptions?.[0]
      ? [
          {
            id: `subscription-${profile.subscriptions[0].id}`,
            activity: `Subscription status: ${profile.subscriptions[0].status}`,
            timestamp: profile.subscriptions[0].updatedAt,
          },
        ]
      : []),
  ]
    .sort(
      (first, second) =>
        new Date(second.timestamp).getTime() - new Date(first.timestamp).getTime(),
    )
    .slice(0, 5);

  return NextResponse.json(activities);
}
