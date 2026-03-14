import { differenceInCalendarDays, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { READ_NOTIFICATIONS_COOKIE, parseReadNotificationIds } from '@/lib/notifications';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);
  const readIds = parseReadNotificationIds(
    request.cookies.get(READ_NOTIFICATIONS_COOKIE)?.value,
  );

  if (!headers) {
    return NextResponse.json([], { status: 200 });
  }

  const [eventsResponse, beneficiariesResponse] = await Promise.all([
    fetch(buildApiUrl('/events'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/beneficiaries'), { headers, cache: 'no-store' }),
  ]);

  const [events, beneficiaries] = await Promise.all([
    eventsResponse.json(),
    beneficiariesResponse.json(),
  ]);

  const today = startOfDay(new Date());
  const notifications = [
    ...events
      .filter((event: { date: string }) => {
        const daysRemaining = differenceInCalendarDays(new Date(event.date), today);
        return daysRemaining >= 0 && daysRemaining <= 14;
      })
      .map((event: any) => {
        const daysRemaining = differenceInCalendarDays(new Date(event.date), today);
        const beneficiaryName = event.beneficiary
          ? `${event.beneficiary.firstName} ${event.beneficiary.lastName}`
          : 'your beneficiary';

        return {
          id: `event-${event.id}`,
          type: 'upcoming_event',
          title: `Upcoming ${event.type}: ${event.title}`,
          message:
            daysRemaining === 0
              ? `${beneficiaryName}'s occasion is happening today.`
              : `${beneficiaryName}'s occasion is in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}.`,
          read: readIds.has(`event-${event.id}`),
          createdAt: event.createdAt,
        };
      }),
    ...beneficiaries
      .slice(0, 3)
      .map((beneficiary: any) => ({
        id: `beneficiary-${beneficiary.id}`,
        type: 'beneficiary_update',
        title: `Profile ready: ${beneficiary.firstName} ${beneficiary.lastName}`,
        message: `${beneficiary.relationship} profile is ready for event planning and gifting reminders.`,
        read: readIds.has(`beneficiary-${beneficiary.id}`),
        createdAt: beneficiary.createdAt,
      })),
  ]
    .sort(
      (first, second) =>
        new Date(second.createdAt).getTime() - new Date(first.createdAt).getTime(),
    )
    .slice(0, 8);

  return NextResponse.json(notifications);
}
