import { PaymentMethodManagement, CurrentSubscription, SubscriptionPlans } from '@/components/subscriptions';
import dynamic from 'next/dynamic';

const PlanComparisonTable = dynamic(() => import('@/components/subscriptions/PlanComparisonTable'));
const PlanComparisonCards = dynamic(() => import('@/components/subscriptions/PlanComparisonCards'));

export default function SubscriptionsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Subscriptions</h1>
      <CurrentSubscription />
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-center">Manage Subscription</h2>
        <PaymentMethodManagement />
      </div>
      <SubscriptionPlans />
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold text-center">Compare Plans</h2>
        <PlanComparisonTable />
        <PlanComparisonCards />
      </div>
    </div>
  );
}
