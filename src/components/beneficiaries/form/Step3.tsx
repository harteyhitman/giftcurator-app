import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { CheckCircle2 } from 'lucide-react';

export default function Step3({ prevStep }: { prevStep: () => void }) {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            Review beneficiary details
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Name</p>
            <p className="mt-2 text-lg font-semibold">
              {values.firstName} {values.lastName}
            </p>
          </div>
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Relationship</p>
            <p className="mt-2 text-lg font-semibold">{values.relationship}</p>
          </div>
          <div className="rounded-2xl bg-primary/[0.03] p-4 sm:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Date of birth</p>
            <p className="mt-2 text-lg font-semibold">
              {values.dob ? format(values.dob, 'MMMM d, yyyy') : 'Not set'}
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={prevStep} className="w-full mb-2 sm:w-auto sm:mb-0">Previous</Button>
        <Button type="submit" className="w-full sm:w-auto">Save Beneficiary</Button>
      </div>
    </div>
  );
}
