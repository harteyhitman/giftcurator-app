import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function Step3({ prevStep }: { prevStep: () => void }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
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
      <FormField
        control={control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Address</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
                <SelectItem value="Friend">Friend</SelectItem>
                <SelectItem value="Family">Family</SelectItem>
                <SelectItem value="Colleague">Colleague</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="gender"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Gender</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="flex items-center gap-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="male" />
                  </FormControl>
                  <FormLabel className="font-normal">Male</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="female" />
                  </FormControl>
                  <FormLabel className="font-normal">Female</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t sm:static sm:p-0 sm:border-0 sm:flex sm:gap-4">
        <Button variant="outline" onClick={prevStep} className="w-full mb-2 sm:w-auto sm:mb-0">Previous</Button>
        <Button type="submit" className="w-full sm:w-auto">Submit</Button>
      </div>
    </div>
  );
}
