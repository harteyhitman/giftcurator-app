'use client';

import { useEventFormStore } from '@/lib/store/event-form';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { eventSchema } from '@/lib/schemas/event';
import { z } from 'zod';
import { Progress } from '@/components/ui/progress';
import { EventStep1, EventStep2, EventStep3, EventStep4 } from './';

export default function EventForm() {
  const [step, setStep] = useState(1);
  const { data, setData } = useEventFormStore();

  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: data,
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
    await fetch('/api/events', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  return (
    <div>
      <Progress value={(step / 4) * 100} className="mb-4" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <EventStep1 nextStep={nextStep} />}
          {step === 2 && <EventStep2 nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <EventStep3 nextStep={nextStep} prevStep={prevStep} />}
          {step === 4 && <EventStep4 prevStep={prevStep} />}
        </form>
      </FormProvider>
    </div>
  );
}
