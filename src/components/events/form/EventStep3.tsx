'use client';

import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { Sparkles, CalendarClock, UserRound } from 'lucide-react';

import { fetcher } from '@/lib/fetcher';

export default function EventStep3({ nextStep, prevStep }: { nextStep: () => void; prevStep: () => void }) {
  const { watch } = useFormContext();
  const values = watch();
  const { data: beneficiaries } = useSWR('/api/beneficiaries', fetcher);

  const beneficiaryName = useMemo(() => {
    const beneficiary = beneficiaries?.find((item: any) => item.id === values.beneficiaryId);
    if (!beneficiary) {
      return 'Select a beneficiary';
    }

    return `${beneficiary.firstName} ${beneficiary.lastName}`;
  }, [beneficiaries, values.beneficiaryId]);

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-black">
            <Sparkles className="h-5 w-5 text-primary" />
            Event readiness check
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
              <CalendarClock className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Timing</p>
            <p className="mt-2 font-semibold">
              {values.date ? new Date(values.date).toLocaleDateString() : 'Choose a date'}
            </p>
          </div>
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
              <UserRound className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Beneficiary</p>
            <p className="mt-2 font-semibold">{beneficiaryName}</p>
          </div>
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <div className="mb-3 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
              <Sparkles className="h-4 w-4" />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Occasion</p>
            <p className="mt-2 font-semibold">{values.type || 'Choose an event type'}</p>
          </div>
        </CardContent>
      </Card>
      <div className="rounded-2xl border border-dashed border-primary/15 p-4 text-sm text-muted-foreground">
        Once saved, this event will appear immediately on the events calendar and on the linked beneficiary profile.
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
        <Button type="button" onClick={nextStep}>Next</Button>
      </div>
    </div>
  );
}
