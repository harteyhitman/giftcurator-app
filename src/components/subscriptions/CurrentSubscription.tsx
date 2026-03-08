'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CurrentSubscription() {
  const { data, error } = useSWR('/api/subscriptions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const { currentPlan } = data;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Subscription</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="font-semibold">{currentPlan.name} Plan</h3>
          <p>Next billing date: {new Date(currentPlan.nextBillingDate).toLocaleDateString()}</p>
        </div>
        <div>
          <h3 className="font-semibold">Payment Method</h3>
          <p>
            {currentPlan.paymentMethod.type} ending in {currentPlan.paymentMethod.last4}
          </p>
          <p>Expires {currentPlan.paymentMethod.expiry}</p>
        </div>
        <div className="flex gap-4">
          <Button>Change Plan</Button>
          <Button variant="outline">Cancel Subscription</Button>
        </div>
      </CardContent>
    </Card>
  );
}
