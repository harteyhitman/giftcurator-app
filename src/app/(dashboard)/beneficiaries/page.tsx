import { Button } from '@/components/ui/button';
import Link from 'next/link';
import BeneficiaryCardList from '@/components/beneficiaries/BeneficiaryCardList';

export default function BeneficiariesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-black tracking-tight">Beneficiaries</h1>
          <p className="text-muted-foreground">
            Keep every important relationship organized with polished profiles and upcoming moments.
          </p>
        </div>
        <Link href="/beneficiaries/new">
          <Button className="rounded-2xl px-5">Add Beneficiary</Button>
        </Link>
      </div>
      <BeneficiaryCardList />
    </div>
  );
}
