import { NextRequest, NextResponse } from 'next/server';

import { safeBackendFetch } from '@/lib/server-api';

type Beneficiary = { id: string; firstName?: string; lastName?: string; createdAt: string };
type Event = { id: string; title: string; createdAt: string };
type Profile = { subscriptions?: Array<{ id: string; status: string; updatedAt?: string }> };

export async function GET(request: NextRequest) {
  const [beneficiariesResult, eventsResult, profileResult] = await Promise.all([
    safeBackendFetch<Beneficiary[]>('/beneficiaries', request),
    safeBackendFetch<Event[]>('/events', request),
    safeBackendFetch<Profile>('/users/me', request),
  ]);

  const beneficiaries = beneficiariesResult.ok && Array.isArray(beneficiariesResult.data) ? beneficiariesResult.data : [];
  const events = eventsResult.ok && Array.isArray(eventsResult.data) ? eventsResult.data : [];
  const profile = profileResult.ok ? profileResult.data : { subscriptions: undefined };

  const activities = [
    ...beneficiaries.map((b) => ({
      id: `beneficiary-${b.id}`,
      activity: `New beneficiary added: ${b.firstName ?? ''} ${b.lastName ?? ''}`.trim() || 'New beneficiary',
      timestamp: b.createdAt,
    })),
    ...events.map((e) => ({
      id: `event-${e.id}`,
      activity: `Event created: ${e.title ?? 'Event'}`,
      timestamp: e.createdAt,
    })),
    ...(profile?.subscriptions?.[0]
      ? [
          {
            id: `subscription-${profile.subscriptions[0].id}`,
            activity: `Subscription status: ${profile.subscriptions[0].status}`,
            timestamp: profile.subscriptions[0].updatedAt ?? profile.subscriptions[0].id,
          },
        ]
      : []),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  return NextResponse.json(activities);
}
