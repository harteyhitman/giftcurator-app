import { differenceInCalendarDays, startOfDay } from 'date-fns';
import { NextRequest, NextResponse } from 'next/server';

import { READ_NOTIFICATIONS_COOKIE, parseReadNotificationIds } from '@/lib/notifications';
import { safeBackendFetch } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const readIds = parseReadNotificationIds(
    request.cookies.get(READ_NOTIFICATIONS_COOKIE)?.value ?? undefined,
  );

  const [eventsResult, beneficiariesResult] = await Promise.all([
    safeBackendFetch<Array<{ id: string; date: string; createdAt: string; beneficiary?: { firstName?: string; lastName?: string }; type: string; title: string }>>('/events', request),
    safeBackendFetch<Array<{ id: string; firstName?: string; lastName?: string; relationship?: string; createdAt: string }>>('/beneficiaries', request),
  ]);

  const events = eventsResult.ok && Array.isArray(eventsResult.data) ? eventsResult.data : [];
  const beneficiaries = beneficiariesResult.ok && Array.isArray(beneficiariesResult.data) ? beneficiariesResult.data : [];
  const today = startOfDay(new Date());
  const notifications = [
    ...events
      .filter((event) => {
        const daysRemaining = differenceInCalendarDays(new Date(event.date), today);
        return daysRemaining >= 0 && daysRemaining <= 14;
      })
      .map((event) => {
        const daysRemaining = differenceInCalendarDays(new Date(event.date), today);
        const beneficiaryName = event.beneficiary
          ? `${event.beneficiary.firstName ?? ''} ${event.beneficiary.lastName ?? ''}`.trim() || 'your beneficiary'
          : 'your beneficiary';

        return {
          id: `event-${event.id}`,
          type: 'upcoming_event',
          title: `Upcoming ${event.type ?? 'event'}: ${event.title ?? 'Event'}`,
          message:
            daysRemaining === 0
              ? `${beneficiaryName}'s occasion is happening today.`
              : `${beneficiaryName}'s occasion is in ${daysRemaining} day${daysRemaining === 1 ? '' : 's'}.`,
          read: readIds.has(`event-${event.id}`),
          createdAt: event.createdAt,
        };
      }),
    ...beneficiaries.slice(0, 3).map((beneficiary) => ({
      id: `beneficiary-${beneficiary.id}`,
      type: 'beneficiary_update',
      title: `Profile ready: ${beneficiary.firstName ?? ''} ${beneficiary.lastName ?? ''}`.trim() || 'Beneficiary',
      message: `${beneficiary.relationship ?? 'Profile'} is ready for event planning and gifting reminders.`,
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
