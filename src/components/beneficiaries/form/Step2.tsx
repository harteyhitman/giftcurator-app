import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function Step2({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { control } = useFormContext();
  const { trackEvent } = useAnalytics();

  const handleNext = () => {
    trackEvent('next_step', 'Beneficiary Form', 'Step 2');
    nextStep();
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="mobile"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Mobile Number</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:static sm:p-0 sm:border-0 sm:flex sm:gap-4">
        <Button variant="outline" onClick={prevStep} className="w-full mb-2 sm:w-auto sm:mb-0">Previous</Button>
        <Button onClick={handleNext} className="w-full sm:w-auto">Next</Button>
      </div>
    </div>
  );
}
