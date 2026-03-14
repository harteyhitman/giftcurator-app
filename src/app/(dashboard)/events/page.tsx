import EventList from '@/components/events/EventList';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Events</h1>
          <p className="text-muted-foreground">
            A professional calendar view of every gifting moment across your beneficiaries.
          </p>
        </div>
        <Link href="/events/new">
          <Button className="rounded-2xl px-5">Create Event</Button>
        </Link>
      </div>
      <EventList />
    </div>
  );
}
