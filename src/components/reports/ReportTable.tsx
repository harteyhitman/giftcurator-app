'use client';

import useSWR from 'swr';
import { columns } from './columns';
import { DataTable } from '@/components/ui/data-table';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ReportTable() {
  const { data, error } = useSWR('/api/reports', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <DataTable columns={columns} data={data.transactions} />;
}
