'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import { Textarea } from '@/components/ui/textarea';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function EventStep2({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { control } = useFormContext();
  const { data: beneficiaries } = useSWR('/api/beneficiaries', fetcher);

  const beneficiaryOptions = beneficiaries?.map((b: any) => ({ label: `${b.firstName} ${b.lastName}`, value: b.id })) || [];

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="beneficiary"
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
      <FormField
        control={control}
        name="maxAmount"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Maximum Amount</FormLabel>
            <FormControl>
              <Input type="number" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="specialMessage"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Message</FormLabel>
            <FormControl>
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex gap-4">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
