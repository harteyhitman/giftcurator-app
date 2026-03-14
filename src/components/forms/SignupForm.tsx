'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sanitize } from '@/lib/utils';
import { SignupSchema, SignupData } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import PasswordStrength from '@/components/shared/PasswordStrength';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { apiFetch } from '@/lib/api';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function SignupForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<SignupData>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      firstName: '',
      lastName: '',
      mobileNumber: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignupData) => {
    try {
      setIsSubmitting(true);

      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          email: sanitize(data.email).toLowerCase(),
          firstName: sanitize(data.firstName),
          lastName: sanitize(data.lastName),
          mobileNumber: sanitize(data.mobileNumber),
          password: sanitize(data.password),
        }),
      });

      const signInResult = await signIn('credentials', {
        email: sanitize(data.email).toLowerCase(),
        password: sanitize(data.password),
        redirect: false,
      });

      if (signInResult?.error) {
        toast.success('Account created successfully. Please log in.');
        router.push('/login');
        return;
      }

      toast.success('Account created successfully!');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <Card className="w-full max-w-[520px] shadow-2xl shadow-primary/5 border-primary/10 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-xl">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-3xl font-black tracking-tight">Create Account</CardTitle>
        <CardDescription className="text-base">
          Join 10,000+ others curating perfect gifts
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline" onClick={() => handleSocialSignIn('google')} className="h-12 rounded-2xl border-primary/10 hover:bg-primary/5 hover:text-primary transition-all">
            Google
          </Button>
          <Button variant="outline" onClick={() => handleSocialSignIn('linkedin')} className="h-12 rounded-2xl border-primary/10 hover:bg-primary/5 hover:text-primary transition-all">
            LinkedIn
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-primary/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-4 text-muted-foreground font-semibold">
              Or continue with email
            </span>
          </div>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="name@example.com" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mobileNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 234 567 890" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                  </FormControl>
                  <PasswordStrength password={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
              {isSubmitting ? 'Creating your account...' : 'Create Account'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t border-primary/5 pt-6 bg-primary/5">
        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-primary hover:underline">
            Log in now
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
