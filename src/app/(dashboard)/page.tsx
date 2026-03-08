import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import KeyMetrics from '@/components/dashboard/KeyMetrics';
import Welcome from '@/components/dashboard/Welcome';

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Welcome />
        <QuickActions />
      </div>
      <KeyMetrics />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <UpcomingEvents />
        </div>
        <div className="col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
