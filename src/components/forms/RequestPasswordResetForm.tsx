'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sanitize } from '@/lib/utils';
import { RequestPasswordResetSchema, RequestPasswordResetData } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import OTPForm from './OTPForm';
import ResetPasswordForm from './ResetPasswordForm';

export default function RequestPasswordResetForm() {
  const [step, setStep] = useState<'request' | 'otp' | 'reset'>('request');
  const [email, setEmail] = useState('');

  const form = useForm<RequestPasswordResetData>({
    resolver: zodResolver(RequestPasswordResetSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: RequestPasswordResetData) => {
    const sanitizedEmail = sanitize(data.email);
    console.log('Requesting reset for:', sanitizedEmail);
    
    // Simulate API call
    toast.info('Sending verification code...');
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmail(sanitizedEmail);
    setStep('otp');
    toast.success('Verification code sent to your email!');
  };

  if (step === 'otp') {
    return <OTPForm email={email} onVerified={() => setStep('reset')} />;
  }

  if (step === 'reset') {
    return <ResetPasswordForm />;
  }

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Reset Password</CardTitle>
        <CardDescription>
          Enter your email address and we'll send you a 6-digit code to reset your password.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Send Reset Code</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href="/login" className="text-sm text-primary hover:underline font-medium">
          Back to login
        </Link>
      </CardFooter>
    </Card>
  );
}
