'use client';

import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { beneficiarySchema } from '@/lib/schemas/beneficiary';
import { z } from 'zod';
import { Step1, Step2, Step3 } from './';
import { Progress } from '@/components/ui/progress';

import { useAnalytics } from '@/hooks/useAnalytics';

export default function BeneficiaryForm() {
  const [step, setStep] = useState(1);
  const { trackEvent } = useAnalytics();

  const form = useForm<z.infer<typeof beneficiarySchema>>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
      relationship: '',
      gender: '',
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const onSubmit = (data: z.infer<typeof beneficiarySchema>) => {
    trackEvent('add_beneficiary', 'Beneficiary', 'Submit');
    console.log(data);
  };

  return (
    <div>
      <Progress value={(step / 3) * 100} className="mb-4" />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {step === 1 && <Step1 nextStep={nextStep} />}
          {step === 2 && <Step2 nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <Step3 prevStep={prevStep} />}
        </form>
      </FormProvider>
    </div>
  );
}
