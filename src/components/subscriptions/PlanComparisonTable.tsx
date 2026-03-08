'use client';

import useSWR from 'swr';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, X } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

export default function PlanComparisonTable() {
  const { data, error } = useSWR('/api/subscriptions', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const allFeatures = Array.from(
    new Set(data.plans.flatMap((plan: any) => plan.features))
  );

  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Feature</TableHead>
            {data.plans.map((plan: any) => (
              <TableHead key={plan.name}>{plan.name}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allFeatures.map((feature) => (
            <TableRow key={feature as string}>
              <TableCell>{feature as string}</TableCell>
              {data.plans.map((plan: any) => (
                <TableCell key={plan.name}>
                  {plan.features.includes(feature) ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <X className="w-5 h-5 text-red-500" />
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
