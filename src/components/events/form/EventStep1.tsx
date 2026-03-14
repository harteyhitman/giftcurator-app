'use client';

import { useFormContext } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DatePicker } from '@/components/ui/datepicker';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarDays, Gift, Heart, PartyPopper } from 'lucide-react';

export default function EventStep1({ nextStep }: { nextStep: () => void }) {
  const { control } = useFormContext();

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
        <div className="mb-2 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-2 text-primary">
            <PartyPopper className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-black">Define the occasion</h2>
            <p className="text-sm text-muted-foreground">
              Give the event a clear title and date so it reads beautifully in the calendar.
            </p>
          </div>
        </div>
      </div>
      <FormField
        control={control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Event Title</FormLabel>
            <FormControl>
              <Input {...field} placeholder="Sophia's Birthday Dinner" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="date"
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
        name="type"
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
                <SelectItem value="graduation">
                  <CalendarDays className="w-4 h-4 mr-2" />
                  Graduation
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="flex justify-end">
        <Button type="button" onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
