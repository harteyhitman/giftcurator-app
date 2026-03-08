import EventForm from '@/components/events/form/EventForm';

export default function NewEventPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Create New Event</h1>
      <EventForm />
    </div>
  );
}
