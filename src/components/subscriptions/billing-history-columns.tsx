'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Payment = {
  id: string;
  date: string;
  amount: number;
  status: string;
};

export const columns: ColumnDef<Payment>[] = [
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
  {
    accessorKey: 'status',
    header: 'Status',
  },
];
