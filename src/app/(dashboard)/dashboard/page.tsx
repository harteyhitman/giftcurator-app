'use client';

import Welcome from '@/components/dashboard/Welcome';
import KeyMetrics from '@/components/dashboard/KeyMetrics';
import QuickActions from '@/components/dashboard/QuickActions';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import RecentActivity from '@/components/dashboard/RecentActivity';
import GiftingInsights from '@/components/dashboard/GiftingInsights';

export default function DashboardPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <Welcome />
        <QuickActions />
      </div>
      
      <section>
        <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Overview</h2>
        <KeyMetrics />
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <UpcomingEvents />
          </section>
        </div>
        
        <div className="space-y-8">
          <section className="bg-card rounded-3xl p-6 border border-primary/10 shadow-sm">
            <RecentActivity />
          </section>
          
          <section>
            <GiftingInsights />
          </section>
        </div>
      </div>
    </div>
  );
}
