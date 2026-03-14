import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarHeart } from 'lucide-react';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function Step2({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { control } = useFormContext();
  const { trackEvent } = useAnalytics();

  const handleNext = () => {
    trackEvent('next_step', 'Beneficiary Form', 'Step 2');
    nextStep();
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-secondary/10 bg-secondary/[0.06] p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-2xl bg-secondary/15 p-2 text-secondary">
            <CalendarHeart className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black">Set the relationship context</h2>
            <p className="text-sm text-muted-foreground">
              This helps the dashboard tailor upcoming event planning and quick reminders.
            </p>
          </div>
        </div>
      </div>
      <FormField
        control={control}
        name="relationship"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Relationship</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a relationship" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Friend">Friend</SelectItem>
                <SelectItem value="Partner">Partner</SelectItem>
                <SelectItem value="Colleague">Colleague</SelectItem>
                <SelectItem value="Mentor">Mentor</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="dob"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Date of Birth</FormLabel>
            <FormControl>
              <DatePicker value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={prevStep} className="w-full mb-2 sm:w-auto sm:mb-0">Previous</Button>
        <Button type="button" onClick={handleNext} className="w-full sm:w-auto">Next</Button>
      </div>
    </div>
  );
}
