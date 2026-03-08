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

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  return (
    <div className="space-y-4">
      <ProfileHeader firstName={data.firstName} lastName={data.lastName} />
      <Tabs defaultValue="upcoming-events">
        <TabsList>
          <TabsTrigger value="upcoming-events">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past-gifts">Past Gifts</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming-events">
          <UpcomingEventsTab events={data.upcomingEvents} />
        </TabsContent>
        <TabsContent value="past-gifts">
          <PastGiftsTab gifts={data.pastGifts} />
        </TabsContent>
        <TabsContent value="notes">
          <NotesTab notes={data.notes} />
        </TabsContent>
        <TabsContent value="timeline">
          <TimelineTab timeline={data.timeline} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
