'use client';

import { useSession } from 'next-auth/react';

export default function Welcome() {
  const { data: session } = useSession();

  return (
    <div className="space-y-1 text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
        Welcome back, <span className="text-primary">{session?.user?.name || 'Curator'}</span>! ✨
      </h1>
      <p className="text-muted-foreground font-medium text-base sm:text-lg">
        Ready to make someone's day special?
      </p>
    </div>
  );
}
