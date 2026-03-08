'use client';

import { useState } from 'react';
import useSWR from 'swr';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import EventDetailModal from './EventDetailModal';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EventList() {
  const { data: events, error } = useSWR('/api/events', fetcher);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (error) return <div>Failed to load</div>;
  if (!events) return <div>Loading...</div>;

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          setSelectedEvent(info.event as any);
        }}
      />
      <EventDetailModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />
    </div>
  );
}
