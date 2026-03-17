'use client';

import useSWR from 'swr';
import StatCard from './StatCard';
import { Calendar, Users, BarChart, Package } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function KeyMetrics() {
  const { data, error } = useSWR('/api/dashboard/metrics', fetcher);

  if (error) return <div className="text-muted-foreground text-sm">Failed to load</div>;
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

  const totalEvents = data?.totalEvents?.value ?? 0;
  const activeBeneficiaries = data?.activeBeneficiaries?.value ?? 0;
  const upcomingEvents = data?.upcomingEvents?.value ?? 0;
  const subscriptionStatus = data?.subscriptionStatus?.value ?? '—';

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Events"
        value={totalEvents}
        icon={<Calendar className="w-4 h-4 text-muted-foreground" />}
        trend={data?.totalEvents?.trend}
      />
      <StatCard
        title="Active Beneficiaries"
        value={activeBeneficiaries}
        icon={<Users className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Upcoming Events"
        value={upcomingEvents}
        icon={<BarChart className="w-4 h-4 text-muted-foreground" />}
      />
      <StatCard
        title="Subscription Status"
        value={subscriptionStatus}
        icon={<Package className="w-4 h-4 text-muted-foreground" />}
      />
    </div>
  );
}
