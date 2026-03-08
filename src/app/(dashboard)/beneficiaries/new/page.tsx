import BeneficiaryForm from '@/components/beneficiaries/form/BeneficiaryForm';

export default function NewBeneficiaryPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Add New Beneficiary</h1>
      <BeneficiaryForm />
    </div>
  );
}
