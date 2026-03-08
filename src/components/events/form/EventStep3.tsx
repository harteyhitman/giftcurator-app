'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function EventStep3({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="buyCard"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Buy a Card?</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="giftType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Type of Gift</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-4 gap-4"
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="physical" />
                  </FormControl>
                  <FormLabel className="font-normal">Physical</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="digital" />
                  </FormControl>
                  <FormLabel className="font-normal">Digital</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="experience" />
                  </FormControl>
                  <FormLabel className="font-normal">Experience</FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="gift-card" />
                  </FormControl>
                  <FormLabel className="font-normal">Gift Card</FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="personalizeGift"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-between p-4 border rounded-lg">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Personalize Gift?</FormLabel>
            </div>
            <FormControl>
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
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
