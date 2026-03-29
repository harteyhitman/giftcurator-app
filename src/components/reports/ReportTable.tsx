'use client';

import useSWR from 'swr';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

import { looseJsonFetcher } from '@/lib/fetcher';

export default function ReportTable() {
  const { data, error } = useSWR('/api/reports', looseJsonFetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <DataTable columns={columns} data={data.transactions} />;
}
