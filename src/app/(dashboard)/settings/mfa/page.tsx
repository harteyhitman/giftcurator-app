import Link from 'next/link';
import { ShieldCheck, Smartphone, KeyRound, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MfaPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-3xl font-black tracking-tight">Multi-Factor Authentication</h1>
        <p className="text-muted-foreground">
          Add an extra verification step to better protect your gifting data and account access.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.3fr_1fr]">
        <Card className="rounded-3xl border-primary/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-black">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Security status
            </CardTitle>
            <CardDescription>
              MFA is not yet enabled for this account. Complete setup when you are ready to harden sign-in security.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
              <p className="font-semibold">Current protection</p>
              <p className="text-sm text-muted-foreground">Email and password authentication is active.</p>
            </div>
            <div className="rounded-2xl border border-primary/10 bg-primary/[0.03] p-4">
              <p className="font-semibold">Recommended next step</p>
              <p className="text-sm text-muted-foreground">
                Add an authenticator app or recovery method before moving to a production account rollout.
              </p>
            </div>
            <div className="flex gap-3">
              <Button disabled className="rounded-2xl px-6">Authenticator setup coming soon</Button>
              <Button variant="outline" asChild className="rounded-2xl">
                <Link href="/settings">Back to settings</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-3xl border-primary/10">
          <CardHeader>
            <CardTitle className="text-xl font-black">Available methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between rounded-2xl border border-primary/10 p-4">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Authenticator app</p>
                  <p className="text-sm text-muted-foreground">Best for ongoing account protection.</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="flex items-center justify-between rounded-2xl border border-primary/10 p-4">
              <div className="flex items-center gap-3">
                <KeyRound className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-semibold">Backup recovery codes</p>
                  <p className="text-sm text-muted-foreground">Use one-time codes if your device is unavailable.</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
