'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup } from '@/components/ui/radio-group';
import RadioCard from '@/components/ui/radio-card';
import { Repeat, Repeat1, Calendar, Gift, Briefcase, Heart, Home, TrendingUp, Baby } from 'lucide-react';

export default function EventStep1({ nextStep }: { nextStep: () => void }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="eventName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Name</FormLabel>
            <FormControl>
              <Input {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="eventDate"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Date</FormLabel>
            <FormControl>
              <DatePicker value={field.value} onChange={field.onChange} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="eventFrequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Frequency</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid grid-cols-4 gap-4"
              >
                <RadioCard value="one-off">
                  <Repeat1 className="w-8 h-8" />
                  <span className="mt-2">One-Off</span>
                </RadioCard>
                <RadioCard value="weekly">
                  <Repeat className="w-8 h-8" />
                  <span className="mt-2">Weekly</span>
                </RadioCard>
                <RadioCard value="monthly">
                  <Calendar className="w-8 h-8" />
                  <span className="mt-2">Monthly</span>
                </RadioCard>
                <RadioCard value="yearly">
                  <Calendar className="w-8 h-8" />
                  <span className="mt-2">Yearly</span>
                </RadioCard>
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="eventType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select an event type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="birthday">
                  <Gift className="w-4 h-4 mr-2" />
                  Birthday
                </SelectItem>
                <SelectItem value="wedding">
                  <Heart className="w-4 h-4 mr-2" />
                  Wedding
                </SelectItem>
                <SelectItem value="anniversary">
                  <Heart className="w-4 h-4 mr-2" />
                  Anniversary
                </SelectItem>
                <SelectItem value="retirement">
                  <Briefcase className="w-4 h-4 mr-2" />
                  Retirement
                </SelectItem>
                <SelectItem value="house-warming">
                  <Home className="w-4 h-4 mr-2" />
                  House Warming
                </SelectItem>
                <SelectItem value="promotion">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Promotion
                </SelectItem>
                <SelectItem value="birth-delivery">
                  <Baby className="w-4 h-4 mr-2" />
                  Birth Delivery
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button onClick={nextStep}>Next</Button>
    </div>
  );
}
