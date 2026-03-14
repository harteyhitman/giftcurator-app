'use client';

import UpcomingEventsTab from '@/components/beneficiaries/UpcomingEventsTab';
import PastGiftsTab from '@/components/beneficiaries/PastGiftsTab';
import NotesTab from '@/components/beneficiaries/NotesTab';
import TimelineTab from '@/components/beneficiaries/TimelineTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProfileHeader from '@/components/beneficiaries/ProfileHeader';
import useSWR from 'swr';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { fetcher } from '@/lib/fetcher';

export default function BeneficiaryDetailPage() {
  const params = useParams();
  const { id } = params;

  const { data, error } = useSWR(`/api/beneficiaries/${id}`, fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) {
    return (
      <div>
        <Skeleton className="h-48" />
        <Skeleton className="h-12 mt-4" />
        <Skeleton className="h-64 mt-4" />
      </div>
    );
  }

  const pastGifts = (data.pastEvents ?? []).flatMap((event: any) =>
    (event.gifts ?? []).map((gift: any) => ({
      id: gift.id,
      giftName: gift.name,
      date: event.date,
      amount: gift.price ?? 0,
    }))
  );

  return (
    <div className="space-y-6">
      <ProfileHeader
        firstName={data.firstName}
        lastName={data.lastName}
        relationship={data.relationship}
        dob={data.dob}
        upcomingEventCount={data.upcomingEvents.length}
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="rounded-2xl border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{data.upcomingEvents.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Past Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{data.pastEvents.length}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-primary/10">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Gift History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-black">{pastGifts.length}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming-events" className="space-y-4">
        <TabsList className="h-auto flex-wrap rounded-2xl bg-primary/[0.03] p-1">
          <TabsTrigger value="upcoming-events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past-gifts">Gift History</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming-events">
          <UpcomingEventsTab events={data.upcomingEvents} />
        </TabsContent>
        <TabsContent value="past-gifts">
          <PastGiftsTab gifts={pastGifts} />
        </TabsContent>
        <TabsContent value="notes">
          <NotesTab
            notes={`Relationship: ${data.relationship}. Keep key gifting preferences and meaningful details here as you continue building out this profile.`}
          />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineTab timeline={data.timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
