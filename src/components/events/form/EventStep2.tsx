'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import useSWR from 'swr';
import { Users } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

export default function EventStep2({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { control } = useFormContext();
  const { data: beneficiaries } = useSWR('/api/beneficiaries', fetcher);

  const beneficiaryOptions = beneficiaries?.map((b: any) => ({ label: `${b.firstName} ${b.lastName}`, value: b.id })) || [];

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-secondary/10 bg-secondary/[0.06] p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-2xl bg-secondary/15 p-2 text-secondary">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black">Attach the event to the right person</h2>
            <p className="text-sm text-muted-foreground">
              Linking the beneficiary keeps your reminders, gifts, and dashboard views in sync.
            </p>
          </div>
        </div>
      </div>
      <FormField
        control={control}
        name="beneficiaryId"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Beneficiary</FormLabel>
            <FormControl>
              <Combobox
                options={beneficiaryOptions}
                value={field.value}
                onChange={field.onChange}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded-2xl border border-dashed border-primary/15 p-4 text-sm text-muted-foreground">
        The selected beneficiary will appear across your event calendar and detail views as soon as you save.
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
        <Button type="button" onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
