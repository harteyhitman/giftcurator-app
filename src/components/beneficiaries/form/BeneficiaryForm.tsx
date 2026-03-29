'use client';

import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { mutate as swrMutate } from 'swr';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { beneficiarySchema } from '@/lib/schemas/beneficiary';
import { z } from 'zod';
import { Step1, Step2, Step3 } from './';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { useAnalytics } from '@/hooks/useAnalytics';

async function parseApiError(response: Response, fallback: string): Promise<string> {
  try {
    const err = await response.json();
    if (typeof err?.message === 'string') return err.message;
  } catch {
    /* ignore */
  }
  return fallback;
}

export default function BeneficiaryForm() {
  const [step, setStep] = useState(1);
  const { trackEvent } = useAnalytics();
  const router = useRouter();

  const form = useForm<z.infer<typeof beneficiarySchema>>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      relationship: '',
      dob: undefined,
    },
  });

  const createBeneficiary = useMutation({
    mutationFn: async (payload: z.infer<typeof beneficiarySchema>) => {
      const response = await fetch('/api/beneficiaries', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...payload,
          dob: payload.dob.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error(await parseApiError(response, 'Unable to create beneficiary'));
      }

      return response.json();
    },
    retry: false,
    onSuccess: () => {
      toast.success('Beneficiary added successfully');
      void swrMutate('/api/beneficiaries');
      router.push('/beneficiaries');
      router.refresh();
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  return (
    <Card className="rounded-3xl border-primary/10 bg-card/80 shadow-xl shadow-primary/5">
      <CardHeader className="space-y-3 border-b border-primary/5">
        <CardTitle className="text-2xl font-black">Build a thoughtful beneficiary profile</CardTitle>
        <CardDescription>
          Capture the essentials now so your reminders and event planning stay polished later.
        </CardDescription>
        <Progress value={(step / 3) * 100} className="mt-2" />
      </CardHeader>
      <CardContent className="p-6">
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              trackEvent('add_beneficiary', 'Beneficiary', 'Submit');
              createBeneficiary.mutate(values);
            })}
          >
            {step === 1 && <Step1 nextStep={nextStep} />}
            {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
            {step === 3 && <Step3 prevStep={prevStep} isSubmitting={createBeneficiary.isPending} />}
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
