'use client';

import useSWR from 'swr';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function PaymentMethods() {
  const { data, error } = useSWR('/api/subscriptions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <Card>
      <CardContent className="space-y-4">
        {/* This is a placeholder. In a real app, you would fetch and display a list of payment methods. */}
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <p className="font-semibold">
              {data.currentPlan.paymentMethod.type} ending in {data.currentPlan.paymentMethod.last4}
            </p>
            <p className="text-sm text-gray-500">Expires {data.currentPlan.paymentMethod.expiry}</p>
          </div>
          <div className="flex gap-4">
            <Button variant="outline">Remove</Button>
            <Button>Set as Default</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
