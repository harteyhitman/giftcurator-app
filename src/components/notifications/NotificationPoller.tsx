'use client';

import { useEffect, useRef } from 'react';
import useSWR from 'swr';
import { toast } from 'sonner';
import useSound from 'use-sound';

import { fetcher } from '@/lib/fetcher';

export default function NotificationPoller() {
  const { data: notifications } = useSWR('/api/notifications', fetcher, { refreshInterval: 10000 });
  const [play] = useSound('/sounds/alert.mp3');
  const previousNotifications = useRef<any[]>([]);

  useEffect(() => {
    if (notifications && previousNotifications.current) {
      const newUnread = notifications.filter(
        (n: any) =>
          !n.read &&
          !previousNotifications.current.some((pn: any) => pn.id === n.id)
      );

      newUnread.forEach((n: any) => {
        toast.info(n.title, { description: n.message });
        if (n.type === 'security_alert') {
          play();
        }
      });
    }

    previousNotifications.current = notifications;
  }, [notifications, play]);

  return null;
}
