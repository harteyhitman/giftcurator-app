'use client';

import useSWR from 'swr';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, Calendar, Gift, Package } from 'lucide-react';

import { looseJsonFetcher } from '@/lib/fetcher';

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
  const { data, error } = useSWR('/api/dashboard/recent-activity', looseJsonFetcher);

  if (error) return <div className="text-muted-foreground text-sm">Failed to load</div>;
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

  const activities = Array.isArray(data) ? data : [];

  return (
    <div className="text-center sm:text-left">
      <h2 className="text-xl font-bold">Recent Activity</h2>
      <div className="mt-4 space-y-4">
        {activities.length === 0 ? (
          <p className="text-muted-foreground text-sm">No recent activity</p>
        ) : (
          activities.map((activity: { id: string; activity?: string; timestamp?: string }) => (
            <div key={activity.id} className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 p-3 rounded-2xl hover:bg-primary/5 transition-colors">
              <Avatar className="h-10 w-10 border border-primary/10">
                <AvatarFallback className="bg-primary/5 text-primary">{getActivityIcon(activity.activity ?? '')}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <p className="text-sm font-medium">{activity.activity ?? 'Activity'}</p>
                <p className="text-xs text-muted-foreground">
                  {activity.timestamp ? new Date(activity.timestamp).toLocaleDateString() : '—'}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
