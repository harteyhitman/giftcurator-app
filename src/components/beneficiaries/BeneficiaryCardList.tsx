'use client';

import useSWR from 'swr';
import BeneficiaryCard from './BeneficiaryCard';
import { AnimatePresence } from 'framer-motion';

import { fetcher } from '@/lib/fetcher';

export default function BeneficiaryCardList() {
  const { data: beneficiaries, error } = useSWR('/api/beneficiaries', fetcher);

  if (error) return <div className="p-8 text-center text-red-500 font-bold bg-red-50 rounded-2xl border border-red-100">Failed to load beneficiaries</div>;
  if (!beneficiaries) return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-48 rounded-3xl bg-primary/5 animate-pulse" />
      ))}
    </div>
  );

  if (beneficiaries.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-primary/15 bg-primary/[0.03] p-10 text-center">
        <h2 className="text-2xl font-black">No beneficiaries yet</h2>
        <p className="mt-2 text-muted-foreground">
          Add your first beneficiary to start organizing occasions and gifting plans.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-muted-foreground">
          {beneficiaries.length} beneficiary{beneficiaries.length === 1 ? '' : 'ies'} in your gifting circle
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence>
          {beneficiaries.map((beneficiary: any) => (
            <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
