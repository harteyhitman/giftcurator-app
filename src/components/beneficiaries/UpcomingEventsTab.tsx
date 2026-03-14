export default function UpcomingEventsTab({ events }: { events: any[] }) {
  if (events.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/15 bg-primary/[0.03] p-6 text-sm text-muted-foreground">
        No upcoming events yet. Add one from the events dashboard to start planning ahead.
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {events.map((event) => (
        <div key={event.id} className="rounded-2xl border border-primary/10 bg-card p-5 shadow-sm">
          <p className="font-semibold">{event.title}</p>
          <p className="mt-2 text-sm text-muted-foreground capitalize">{event.type}</p>
          <p className="mt-4 text-sm font-medium">
            {new Date(event.date).toLocaleDateString(undefined, {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      ))}
    </div>
  );
}
