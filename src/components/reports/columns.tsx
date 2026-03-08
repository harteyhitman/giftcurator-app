'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Transaction = {
  id: string;
  beneficiary: string;
  event: string;
  date: string;
  amount: number;
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'beneficiary',
    header: 'Beneficiary',
  },
  {
    accessorKey: 'event',
    header: 'Event',
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }: { row: any }) => new Date(row.getValue('date')).toLocaleDateString(),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }: { row: any }) => `$${row.getValue('amount')}`,
  },
];
