import BeneficiaryForm from '@/components/beneficiaries/form/BeneficiaryForm';

export default function NewBeneficiaryPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Add New Beneficiary</h1>
        <p className="text-muted-foreground">
          Create a clean profile that makes future reminders and event planning effortless.
        </p>
      </div>
      <BeneficiaryForm />
    </div>
  );
}
