'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    if (!session?.user?.accessToken) {
      return (
        <div className="mx-auto mt-16 max-w-lg space-y-4 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="text-lg font-black text-amber-950">Sign in again to use the API</h2>
          <p className="text-sm text-amber-900/80">
            You&apos;re signed in to the app, but your session has no backend access token, so protected
            API calls return <strong>401</strong>. Sign out and sign back in with email/password or Google.
            Ensure <code className="rounded bg-amber-100 px-1 text-xs">NEXTAUTH_SECRET</code> is set and{' '}
            <code className="rounded bg-amber-100 px-1 text-xs">NEXT_PUBLIC_API_URL</code> points at your
            Nest API (<code className="rounded bg-amber-100 px-1 text-xs">…/api</code>).
          </p>
          <Button type="button" variant="default" className="font-bold" onClick={() => signOut({ callbackUrl: '/login' })}>
            Sign out
          </Button>
        </div>
      );
    }
    return <>{children}</>;
  }

  return null;
}
