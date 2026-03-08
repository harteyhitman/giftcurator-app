'use client';

import useSWR from 'swr';
import EventCard from './EventCard';
import { Skeleton } from '@/components/ui/skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function UpcomingEvents() {
  const { data, error } = useSWR('/api/dashboard/upcoming-events', fetcher);

  if (error) return <div>Failed to load</div>;
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

  return (
    <div>
      <h2 className="text-xl font-bold">Upcoming Events</h2>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((event: any) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </div>
  );
}
