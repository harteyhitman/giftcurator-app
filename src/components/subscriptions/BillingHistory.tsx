'use client';

import useSWR from 'swr';
import { columns } from './billing-history-columns';
import { DataTable } from '@/components/ui/data-table';

import { looseJsonFetcher } from '@/lib/fetcher';

export default function BillingHistory() {
  const { data, error } = useSWR('/api/subscriptions', looseJsonFetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <DataTable columns={columns} data={data.billingHistory} />;
}
