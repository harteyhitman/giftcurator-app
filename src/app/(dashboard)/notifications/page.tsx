'use client';

import { useState, useMemo } from 'react';
import useSWR from 'swr';
import { columns } from '@/components/notifications/columns';
import { DataTable } from '@/components/ui/data-table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { fetcher } from '@/lib/fetcher';

export default function NotificationsPage() {
  const { data: notifications, error } = useSWR('/api/notifications', fetcher);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredNotifications = useMemo(() => {
    if (!notifications) return [];
    return notifications
      .filter((n: any) => {
        if (filter === 'all') return true;
        if (filter === 'read') return n.read;
        if (filter === 'unread') return !n.read;
        return true;
      })
      .filter(
        (n: any) =>
          n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          n.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [notifications, filter, searchTerm]);

  if (error) return <div>Failed to load</div>;
  if (!notifications) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'default' : 'outline'}>
            All
          </Button>
          <Button onClick={() => setFilter('read')} variant={filter === 'read' ? 'default' : 'outline'}>
            Read
          </Button>
          <Button onClick={() => setFilter('unread')} variant={filter === 'unread' ? 'default' : 'outline'}>
            Unread
          </Button>
        </div>
        <Input
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <DataTable columns={columns} data={filteredNotifications} />
    </div>
  );
}
