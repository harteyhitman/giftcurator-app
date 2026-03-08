'use client';

import useSWR from 'swr';
import BeneficiaryCard from './BeneficiaryCard';
import { AnimatePresence } from 'framer-motion';

import { fetcher } from '@/lib/fetcher';

export default function BeneficiaryCardList() {
  const { data: beneficiaries, error } = useSWR('/api/beneficiaries', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!beneficiaries) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {beneficiaries.map((beneficiary: any) => (
          <BeneficiaryCard key={beneficiary.id} beneficiary={beneficiary} />
        ))}
      </AnimatePresence>
    </div>
  );
}
