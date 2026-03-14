import EventForm from '@/components/events/form/EventForm';

export default function NewEventPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Create New Event</h1>
        <p className="text-muted-foreground">
          Add a well-structured occasion to your calendar and keep your gifting plans ahead of schedule.
        </p>
      </div>
      <EventForm />
    </div>
  );
}
