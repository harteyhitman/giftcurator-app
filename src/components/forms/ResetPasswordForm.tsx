'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sanitize } from '@/lib/utils';
import { ResetPasswordSchema, ResetPasswordData } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import PasswordStrength from '@/components/shared/PasswordStrength';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { useRouter } from 'next/navigation';

export default function ResetPasswordForm() {
  const router = useRouter();
  const form = useForm<ResetPasswordData>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: ResetPasswordData) => {
    const sanitizedData = {
      password: sanitize(data.password),
      confirmPassword: sanitize(data.confirmPassword),
    };
    console.log('Resetting password:', sanitizedData);
    
    // Simulate reset
    toast.success('Password reset successfully!');
    await new Promise(resolve => setTimeout(resolve, 1000));
    router.push('/login');
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader>
        <CardTitle>Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your new password" {...field} />
                  </FormControl>
                  <PasswordStrength password={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm your new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Reset Password</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
