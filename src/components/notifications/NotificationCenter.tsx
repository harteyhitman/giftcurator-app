'use client';

import useSWR, { mutate } from 'swr';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function NotificationCenter() {
  const { data: notifications } = useSWR('/api/notifications', fetcher);
  const { trackEvent } = useAnalytics();

  const unreadCount = notifications?.filter((n: any) => !n.read).length || 0;

  const handleMarkAllAsRead = async () => {
    trackEvent('mark_all_as_read', 'Notifications', 'Click');
    await fetch('/api/notifications/mark-all-as-read', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ids: notifications?.map((notification: any) => notification.id) ?? [],
      }),
    });

    mutate(
      '/api/notifications',
      notifications?.map((notification: any) => ({ ...notification, read: true })),
      false,
    );
    mutate('/api/notifications');
  };

  const handleOpen = (isOpen: boolean) => {
    if (isOpen) {
      trackEvent('view_notifications', 'Notifications', 'Open');
    }
  };

  return (
    <Popover onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"></span>
              <span className="relative inline-flex w-2 h-2 bg-red-500 rounded-full"></span>
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Notifications</h4>
            <p className="text-sm text-muted-foreground">You have {unreadCount} unread messages.</p>
          </div>
          <div className="grid gap-2">
            {notifications?.slice(0, 5).map((n: any) => (
              <div key={n.id} className="grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span className={`flex w-2 h-2 translate-y-1 rounded-full ${n.read ? 'bg-gray-300' : 'bg-sky-500'}`} />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{n.title}</p>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between">
            <Button onClick={handleMarkAllAsRead} variant="link">Mark all as read</Button>
            <Link href="/notifications">
              <Button variant="link">View all</Button>
            </Link>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
