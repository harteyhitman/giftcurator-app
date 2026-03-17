'use client';

import useSWR from 'swr';
import EventCard, { type EventCardProps } from './EventCard';

type UpcomingEventItem = EventCardProps & { id: string };
import { Skeleton } from '@/components/ui/skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UpcomingEvents() {
  const { data, error } = useSWR('/api/dashboard/upcoming-events', fetcher);

  if (error) return <div className="text-muted-foreground text-sm">Failed to load</div>;
  if (!data) {
    return (
      <div>
        <h2 className="text-xl font-bold">Upcoming Events</h2>
        <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
          <Skeleton className="h-64" />
        </div>
      </div>
    );
  }

  const events: UpcomingEventItem[] = Array.isArray(data) ? data : [];

  return (
    <div>
      <h2 className="text-xl font-bold">Upcoming Events</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {events.length === 0 ? (
          <p className="text-muted-foreground text-sm col-span-full">No upcoming events</p>
        ) : (
          events.map((event) => {
            const { id, ...cardProps } = event;
            return <EventCard key={id} {...cardProps} />;
          })
        )}
      </div>
    </div>
  );
}
