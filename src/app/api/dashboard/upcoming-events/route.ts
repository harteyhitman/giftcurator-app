import { differenceInCalendarDays, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { safeBackendFetch } from '@/lib/server-api';

type EventItem = {
  id: string;
  date: string;
  title: string;
  type: string;
  beneficiary?: { firstName?: string; lastName?: string };
};

export async function GET(request: NextRequest) {
  const result = await safeBackendFetch<EventItem[]>('/events', request);

  if (!result.ok) {
    return NextResponse.json([]);
  }

  const events = Array.isArray(result.data) ? result.data : [];
  const today = startOfDay(new Date());

  const upcomingEvents = events
    .filter((event) => new Date(event.date).getTime() >= today.getTime())
    .slice(0, 6)
    .map((event) => {
      const eventDate = new Date(event.date);
      const daysRemaining = differenceInCalendarDays(eventDate, today);

      return {
        id: event.id,
        eventName: event.title,
        eventType: (event.type ?? '').charAt(0).toUpperCase() + (event.type ?? '').slice(1),
        beneficiaryName: event.beneficiary
          ? `${event.beneficiary.firstName ?? ''} ${event.beneficiary.lastName ?? ''}`.trim() || 'Unknown beneficiary'
          : 'Unknown beneficiary',
        daysRemaining,
        progress: Math.max(0.1, Math.min(0.95, 1 - daysRemaining / 30)),
      };
    });

  return NextResponse.json(upcomingEvents);
}
