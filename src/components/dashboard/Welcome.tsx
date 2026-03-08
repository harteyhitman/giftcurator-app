'use client';

import { useSession } from 'next-auth/react';

export default function Welcome() {
  const { data: session } = useSession();

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
      <p className="text-muted-foreground">Here is your dashboard overview.</p>
    </div>
  );
}
