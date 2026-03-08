import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BeneficiaryCardList from '@/components/beneficiaries/BeneficiaryCardList';

export default function BeneficiariesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Beneficiaries</h1>
        <Link href="/beneficiaries/new">
          <Button>Add Beneficiary</Button>
        </Link>
      </div>
      <BeneficiaryCardList />
    </div>
  );
}
