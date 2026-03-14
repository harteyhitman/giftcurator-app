'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { sanitize } from '@/lib/utils';
import { LoginSchema, LoginData } from '@/lib/types/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

export default function LoginForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    const result = await signIn('credentials', {
      email: sanitize(data.email).toLowerCase(),
      password: sanitize(data.password),
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success('Login successful!');
      router.push('/dashboard');
    }

    setIsSubmitting(false);
  };

  const handleSocialSignIn = (provider: string) => {
    signIn(provider, { callbackUrl: '/dashboard' });
  };

  return (
    <Card className="w-full max-w-[420px] shadow-2xl shadow-primary/5 border-primary/10 rounded-3xl overflow-hidden bg-card/80 backdrop-blur-xl">
      <CardHeader className="space-y-2 pb-6">
        <CardTitle className="text-3xl font-black tracking-tight">Welcome Back</CardTitle>
        <CardDescription className="text-base">
          Enter your email and password to access your account
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="font-bold">Password</FormLabel>
                    <Link
                      href="/reset-password"
                      className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot?
                    </Link>
                  </div>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} className="h-12 rounded-xl border-primary/10 bg-background/50 focus:ring-primary/20" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02]">
              {isSubmitting ? 'Signing you in...' : 'Sign In'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col gap-4 border-t border-primary/5 pt-6 bg-primary/5">
        <div className="text-center text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link href="/signup" className="font-bold text-primary hover:underline">
            Sign up now
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
