'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { ShieldCheck, BellRing, UserCircle2, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { fetcher } from '@/lib/fetcher';

type Profile = {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
  mobileNumber?: string | null;
  beneficiaries?: Array<{ id: string }>;
  subscriptions?: Array<{ id: string; status: string; plan: string }>;
};

export default function SettingsPage() {
  const { data, error, mutate, isLoading } = useSWR<Profile>('/api/settings/profile', fetcher);
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!data) {
      return;
    }

    setForm({
      firstName: data.firstName ?? '',
      lastName: data.lastName ?? '',
      email: data.email ?? '',
      mobileNumber: data.mobileNumber ?? '',
    });
  }, [data]);

  const stats = useMemo(
    () => [
      { label: 'Beneficiaries', value: data?.beneficiaries?.length ?? 0 },
      { label: 'Active plan', value: data?.subscriptions?.[0]?.plan ?? 'None' },
      { label: 'Security', value: 'Protected' },
    ],
    [data],
  );

  const handleSave = async () => {
    try {
      setIsSaving(true);

      const response = await fetch('/api/settings/profile', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const body = await response.json();

      if (!response.ok) {
        throw new Error(body.message || 'Unable to update profile');
      }

      await mutate(body, false);
      toast.success('Profile updated');
    } catch (error: any) {
      toast.error(error.message || 'Unable to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  if (error) {
    return <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-600">Failed to load settings.</div>;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your profile, notification experience, and account security from one professional dashboard.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((item) => (
          <Card key={item.label} className="rounded-2xl border-primary/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {item.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-black">{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <Card className="rounded-3xl border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <UserCircle2 className="h-5 w-5 text-primary" />
              Profile details
            </CardTitle>
            <CardDescription>
              Keep your account information current so notifications and account recovery stay accurate.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5 sm:grid-cols-2">
            {isLoading ? (
              <>
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full sm:col-span-2" />
                <Skeleton className="h-12 w-full sm:col-span-2" />
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={form.firstName}
                    onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={form.lastName}
                    onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                  />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="mobileNumber">Phone number</Label>
                  <Input
                    id="mobileNumber"
                    value={form.mobileNumber}
                    onChange={(event) => setForm((current) => ({ ...current, mobileNumber: event.target.value }))}
                  />
                </div>
              </>
            )}
            <div className="sm:col-span-2 flex justify-end">
              <Button onClick={handleSave} disabled={isSaving} className="rounded-2xl px-6">
                {isSaving ? 'Saving...' : 'Save changes'}
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="rounded-3xl border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-black">
                <BellRing className="h-5 w-5 text-primary" />
                Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/settings/notifications" className="flex items-center justify-between rounded-2xl border border-primary/10 p-4 transition-colors hover:bg-primary/[0.03]">
                <div>
                  <p className="font-semibold">Notification preferences</p>
                  <p className="text-sm text-muted-foreground">Email, push alerts, and quiet hours.</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
              <Link href="/settings/mfa" className="flex items-center justify-between rounded-2xl border border-primary/10 p-4 transition-colors hover:bg-primary/[0.03]">
                <div>
                  <p className="font-semibold">Multi-factor authentication</p>
                  <p className="text-sm text-muted-foreground">Strengthen access to your account.</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-black">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Security overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-2xl bg-primary/[0.03] p-4">
                <p className="text-sm font-semibold">Primary sign-in method</p>
                <p className="text-sm text-muted-foreground">Email and password</p>
              </div>
              <div className="rounded-2xl bg-primary/[0.03] p-4">
                <p className="text-sm font-semibold">Recovery channel</p>
                <p className="text-sm text-muted-foreground">{form.mobileNumber || 'Add a phone number for recovery support.'}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
