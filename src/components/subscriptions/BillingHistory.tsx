'use client';

import useSWR from 'swr';
import { columns } from './billing-history-columns';
import { DataTable } from '@/components/ui/data-table';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function BillingHistory() {
  const { data, error } = useSWR('/api/subscriptions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <DataTable columns={columns} data={data.billingHistory} />;
}
