import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function Step1({ nextStep }: { nextStep: () => void }) {
  const { control } = useFormContext();
  const { trackEvent } = useAnalytics();

  const handleNext = () => {
    trackEvent('next_step', 'Beneficiary Form', 'Step 1');
    nextStep();
  };

  return (
    <div className="space-y-4">
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
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:static sm:p-0 sm:border-0">
        <Button onClick={handleNext} className="w-full sm:w-auto">Next</Button>
      </div>
    </div>
  );
}
