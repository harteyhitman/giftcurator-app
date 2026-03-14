import { differenceInCalendarDays, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(buildApiUrl('/events'), {
    headers,
    cache: 'no-store',
  });

  const events = await response.json();
  const today = startOfDay(new Date());

  const upcomingEvents = events
    .filter((event: { date: string }) => new Date(event.date).getTime() >= today.getTime())
    .slice(0, 6)
    .map((event: any) => {
      const eventDate = new Date(event.date);
      const daysRemaining = differenceInCalendarDays(eventDate, today);

      return {
        id: event.id,
        eventName: event.title,
        eventType: event.type.charAt(0).toUpperCase() + event.type.slice(1),
        beneficiaryName: event.beneficiary
          ? `${event.beneficiary.firstName} ${event.beneficiary.lastName}`
          : 'Unknown beneficiary',
        daysRemaining,
        progress: Math.max(0.1, Math.min(0.95, 1 - daysRemaining / 30)),
      };
    });

  return NextResponse.json(upcomingEvents);
}
