'use client';

import { ColumnDef } from '@tanstack/react-table';

export type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

export const columns: ColumnDef<Notification>[] = [
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'message',
    header: 'Message',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
    cell: ({ row }: { row: any }) => new Date(row.getValue('createdAt')).toLocaleDateString(),
  },
  {
    accessorKey: 'read',
    header: 'Status',
    cell: ({ row }: { row: any }) => (row.getValue('read') ? 'Read' : 'Unread'),
  },
];
