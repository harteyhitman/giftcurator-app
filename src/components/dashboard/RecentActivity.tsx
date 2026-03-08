'use client';

import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, Gift, Package } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const getActivityIcon = (activity: string) => {
  if (activity.includes('beneficiary')) {
    return <Users className="w-5 h-5" />;
  }
  if (activity.includes('Event')) {
    return <Calendar className="w-5 h-5" />;
  }
  if (activity.includes('Gift')) {
    return <Gift className="w-5 h-5" />;
  }
  if (activity.includes('Subscription')) {
    return <Package className="w-5 h-5" />;
  }
  return null;
};

export default function RecentActivity() {
  const { data, error } = useSWR('/api/dashboard/recent-activity', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) {
    return (
      <div>
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <div className="mt-4 space-y-4">
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-60" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold">Recent Activity</h2>
      <div className="mt-4 space-y-4">
        {data.map((activity: any) => (
          <div key={activity.id} className="flex items-center gap-4">
            <Avatar>
              <AvatarFallback>{getActivityIcon(activity.activity)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm">{activity.activity}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(activity.timestamp).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
