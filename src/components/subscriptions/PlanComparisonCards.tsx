'use client';

import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, X } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

export default function PlanComparisonCards() {
  const { data, error } = useSWR('/api/subscriptions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const allFeatures = Array.from(
    new Set(data.plans.flatMap((plan: any) => plan.features))
  );

  return (
    <div className="grid gap-8 md:hidden">
      {data.plans.map((plan: any) => (
        <Card key={plan.name}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {allFeatures.map((feature) => (
                <li key={feature as string} className="flex items-center">
                  {plan.features.includes(feature) ? (
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 mr-2 text-red-500" />
                  )}
                  <span>{feature as string}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
