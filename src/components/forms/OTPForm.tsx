'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OTPSchema, OTPData } from '@/lib/types/auth';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"

interface OTPFormProps {
  email: string;
  onVerified: () => void;
}

export default function OTPForm({ email, onVerified }: OTPFormProps) {
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<OTPData>({
    resolver: zodResolver(OTPSchema),
    defaultValues: {
      otp: '',
    },
  });

  const onSubmit = async (data: OTPData) => {
    console.log('Verifying OTP:', data.otp, 'for', email);
    
    // Simulate verification
    toast.info('Verifying code...');
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (data.otp === '123456') { // Mock success
      toast.success('Verification successful!');
      onVerified();
    } else {
      toast.error('Invalid verification code. Try "123456"');
    }
  };

  const handleResend = () => {
    setTimer(60);
    toast.success('New verification code sent!');
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Verify Email</CardTitle>
        <CardDescription>
          We've sent a 6-digit code to <span className="font-medium text-foreground">{email}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="otp"
              render={({ field }) => (
                <FormItem className="flex flex-col items-center">
                  <FormLabel className="sr-only">One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field} className="gap-2">
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full h-12 text-lg">Verify & Continue</Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <div className="text-sm text-muted-foreground">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span>Resend in {timer}s</span>
          ) : (
            <button 
              onClick={handleResend}
              className="text-primary hover:underline font-medium"
            >
              Resend now
            </button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
