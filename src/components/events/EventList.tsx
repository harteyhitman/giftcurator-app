'use client';

import { useState } from 'react';
import useSWR from 'swr';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { startOfDay } from 'date-fns';
import EventDetailModal from './EventDetailModal';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';

export default function EventList() {
  const { data: events, error } = useSWR('/api/events', fetcher);
  const [selectedEvent, setSelectedEvent] = useState(null);

  if (error) return (
    <div className="p-8 text-center text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100">
      Failed to load events. Please try again later.
    </div>
  );

  if (!events) return (
    <Card className="rounded-3xl border-primary/5 shadow-sm">
      <CardHeader>
        <Skeleton className="h-8 w-48" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[600px] w-full rounded-2xl" />
      </CardContent>
    </Card>
  );

  const today = startOfDay(new Date()).getTime();
  const sortedEvents = [...events].sort(
    (first: any, second: any) =>
      new Date(first.date).getTime() - new Date(second.date).getTime()
  );
  const upcomingEvents = sortedEvents.filter(
    (event: any) => new Date(event.date).getTime() >= today
  );

  // Map backend event data to FullCalendar format
  const calendarEvents = sortedEvents.map((event: any) => ({
    id: event.id,
    title: event.title,
    start: event.date,
    allDay: true,
    extendedProps: {
      ...event
    }
  }));

  return (
    <div className="grid gap-6 xl:grid-cols-[1.7fr_0.9fr]">
      <Card className="rounded-3xl border-primary/5 shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
        <CardHeader className="border-b border-primary/5 bg-primary/[0.02] pb-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="text-xl font-black text-primary">Event Calendar</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track every upcoming occasion in one polished scheduling view.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Upcoming moments</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="calendar-container">
            <style jsx global>{`
              .fc { font-family: inherit; --fc-border-color: rgba(var(--primary), 0.05); --fc-button-bg-color: hsl(var(--primary)); --fc-button-border-color: hsl(var(--primary)); --fc-button-hover-bg-color: hsl(var(--primary) / 0.9); --fc-button-active-bg-color: hsl(var(--primary) / 0.8); }
              .fc .fc-toolbar-title { font-weight: 900; font-size: 1.5rem; letter-spacing: -0.025em; }
              .fc .fc-button { border-radius: 0.75rem; font-weight: 700; text-transform: capitalize; padding: 0.5rem 1rem; }
              .fc .fc-daygrid-day.fc-day-today { background: rgba(var(--secondary), 0.05) !important; }
              .fc .fc-event { border-radius: 0.5rem; padding: 2px 4px; font-weight: 600; background-color: hsl(var(--primary)); border: none; cursor: pointer; transition: transform 0.2s; }
              .fc .fc-event:hover { transform: scale(1.02); }
              .fc .fc-daygrid-day-frame { padding: 4px; }
            `}</style>
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              events={calendarEvents}
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,dayGridWeek'
              }}
              eventClick={(info) => {
                setSelectedEvent(info.event.extendedProps as any);
              }}
              height="auto"
              aspectRatio={1.8}
            />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-3xl border-primary/5 shadow-sm">
        <CardHeader className="border-b border-primary/5">
          <CardTitle className="text-xl font-black">Upcoming schedule</CardTitle>
          <p className="text-sm text-muted-foreground">
            {upcomingEvents.length} event{upcomingEvents.length === 1 ? '' : 's'} on the horizon
          </p>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {upcomingEvents.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/15 bg-primary/[0.03] p-6 text-sm text-muted-foreground">
              No upcoming events yet. Create one to populate your calendar.
            </div>
          ) : (
            upcomingEvents.slice(0, 6).map((event: any) => (
              <button
                key={event.id}
                type="button"
                onClick={() => setSelectedEvent(event)}
                className="w-full rounded-2xl border border-primary/10 p-4 text-left transition-colors hover:bg-primary/[0.03]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString(undefined, {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {event.beneficiary
                        ? `${event.beneficiary.firstName} ${event.beneficiary.lastName}`
                        : 'Beneficiary pending'}
                    </p>
                  </div>
                  <Badge variant="secondary" className="rounded-full capitalize">
                    {event.type}
                  </Badge>
                </div>
              </button>
            ))
          )}
        </CardContent>
      </Card>
      
      <EventDetailModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={() => setSelectedEvent(null)}
      />
    </div>
  );
}
