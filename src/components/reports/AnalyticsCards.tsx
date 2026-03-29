'use client';

import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import {
  TotalSpentCard,
  EventsPerMonthChart,
  GiftTypeDistributionChart,
  SpendingByBeneficiaryChart,
} from './';

import { looseJsonFetcher } from '@/lib/fetcher';

export default function AnalyticsCards() {
  const { data, error } = useSWR('/api/reports', looseJsonFetcher);

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
      <TotalSpentCard data={data.totalSpent} />
      <EventsPerMonthChart data={data.eventsPerMonth} />
      <GiftTypeDistributionChart data={data.giftTypeDistribution} />
      <SpendingByBeneficiaryChart data={data.spendingByBeneficiary} />
    </div>
  );
}
