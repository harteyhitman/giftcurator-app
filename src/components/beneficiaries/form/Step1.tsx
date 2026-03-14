import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeartHandshake } from 'lucide-react';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function Step1({ nextStep }: { nextStep: () => void }) {
  const { control } = useFormContext();
  const { trackEvent } = useAnalytics();

  const handleNext = () => {
    trackEvent('next_step', 'Beneficiary Form', 'Step 1');
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <HeartHandshake className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black">Who are you planning for?</h2>
            <p className="text-sm text-muted-foreground">
              Start with the person&apos;s name so your dashboard feels personal from day one.
            </p>
          </div>
        </div>
      </div>
      <FormField
        control={control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>First Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Last Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end">
        <Button type="button" onClick={handleNext} className="w-full sm:w-auto">Next</Button>
      </div>
    </div>
  );
}
