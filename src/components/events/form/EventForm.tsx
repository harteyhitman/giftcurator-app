'use client';

import { useEventFormStore } from '@/lib/store/event-form';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/lib/schemas/event';
import { z } from 'zod';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { EventStep1, EventStep2, EventStep3, EventStep4 } from './';

export default function EventForm() {
  const [step, setStep] = useState(1);
  const { data, setData } = useEventFormStore();
  const router = useRouter();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: data.title ?? '',
      date: data.date ? new Date(data.date) : undefined,
      type: data.type ?? '',
      beneficiaryId: data.beneficiaryId ?? '',
    },
  });

  const { watch } = form;

  useEffect(() => {
    const subscription = watch((value) => {
      setData(value as z.infer<typeof eventSchema>);
    });
    return () => subscription.unsubscribe();
  }, [watch, setData]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: z.infer<typeof eventSchema>) => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Unable to create event');
    }

    toast.success('Event created successfully');
    router.push('/events');
    router.refresh();
  };

  return (
    <Card className="rounded-3xl border-primary/10 bg-card/80 shadow-xl shadow-primary/5">
      <CardHeader className="space-y-3 border-b border-primary/5">
        <CardTitle className="text-2xl font-black">Craft a polished event plan</CardTitle>
        <CardDescription>
          Capture the occasion, connect it to the right beneficiary, and keep your gifting calendar sharp.
        </CardDescription>
        <Progress value={(step / 4) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="p-6">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(async (values) => {
              try {
                await onSubmit({
                  ...values,
                  date: values.date,
                });
              } catch (error: any) {
                toast.error(error.message || 'Unable to save event');
              }
            })}
          >
            {step === 1 && <EventStep1 nextStep={nextStep} />}
            {step === 2 && <EventStep2 nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <EventStep3 nextStep={nextStep} prevStep={prevStep} />}
            {step === 4 && <EventStep4 prevStep={prevStep} />}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
