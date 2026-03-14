'use client';

import { useFormContext } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { format } from 'date-fns';

import { fetcher } from '@/lib/fetcher';

export default function EventStep4({ prevStep }: { prevStep: () => void }) {
  const { getValues } = useFormContext();
  const { data: beneficiaries } = useSWR('/api/beneficiaries', fetcher);

  const values = getValues();
  const beneficiary = beneficiaries?.find((item: any) => item.id === values.beneficiaryId);
  const beneficiaryName = beneficiary
    ? `${beneficiary.firstName} ${beneficiary.lastName}`
    : 'Not selected';

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-primary/10">
        <CardHeader>
          <CardTitle className="text-xl font-black">Review your event plan</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <h3 className="font-semibold">Event Details</h3>
            <p className="mt-3 text-sm text-muted-foreground">Title</p>
            <p className="font-semibold">{values.title}</p>
            <p className="mt-3 text-sm text-muted-foreground">Date</p>
            <p className="font-semibold">{values.date ? format(values.date, 'MMMM d, yyyy') : 'Not set'}</p>
            <p className="mt-3 text-sm text-muted-foreground">Type</p>
            <p className="font-semibold capitalize">{values.type}</p>
          </div>
          <div className="rounded-2xl bg-primary/[0.03] p-4">
            <h3 className="font-semibold">Beneficiary</h3>
            <p className="mt-3 text-sm text-muted-foreground">Linked profile</p>
            <p className="font-semibold">{beneficiaryName}</p>
            <p className="mt-3 text-sm text-muted-foreground">Experience</p>
            <p className="font-semibold">
              This event will appear on the calendar and the beneficiary detail page.
            </p>
          </div>
        </CardContent>
      </Card>
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Button variant="outline" onClick={prevStep}>Previous</Button>
        <Button type="submit">Create Event</Button>
      </div>
    </div>
  );
}
