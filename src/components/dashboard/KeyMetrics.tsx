'use client';

import useSWR from 'swr';
import StatCard from './StatCard';
import { Calendar, Users, BarChart, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function KeyMetrics() {
  const { data, error } = useSWR('/api/dashboard/metrics', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
        <Skeleton className="h-32" />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Events"
        value={data.totalEvents.value}
        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
        trend={data.totalEvents.trend}
      />
      <StatCard
        title="Active Beneficiaries"
        value={data.activeBeneficiaries.value}
        icon={<Users className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Upcoming Events"
        value={data.upcomingEvents.value}
        icon={<BarChart className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Subscription Status"
        value={data.subscriptionStatus.value}
        icon={<Package className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
}
