'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

import { useAnalytics } from '@/hooks/useAnalytics';

export default function SubscriptionPlans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const { data, error } = useSWR('/api/subscriptions', fetcher);
  const { trackEvent } = useAnalytics();

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const plans = Array.isArray(data?.plans) ? data.plans : [];

  const handleChoosePlan = (planName: string) => {
    trackEvent('choose_plan', 'Subscription', planName);
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-4 my-8">
        <span>Monthly</span>
        <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
        <span>Annual</span>
      </div>
      <div className="grid gap-8 md:grid-cols-3">
        {plans.map((plan: any) => (
          <Card key={plan.name} className={plan.popular ? 'border-purple-500' : ''}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              {plan.popular && <div className="text-sm text-purple-500">Most Popular</div>}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                ${isAnnual ? plan.price.annual : plan.price.monthly}
                <span className="text-lg font-normal">/{isAnnual ? 'year' : 'month'}</span>
              </div>
              <ul className="space-y-2">
                {(Array.isArray(plan.features) ? plan.features : []).map((feature: string) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button onClick={() => handleChoosePlan(plan.name)} className="w-full">Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
