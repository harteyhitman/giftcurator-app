import EventCard from '@/components/dashboard/EventCard';

export default function UpcomingEventsTab({ events }: { events: any[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {events.map((event) => (
        <EventCard key={event.id} {...event} />
      ))}
    </div>
  );
}
