'use client';

import { Button } from '@/components/ui/button';

export default function Fallback({ error, resetErrorBoundary }: { error: unknown; resetErrorBoundary: () => void }) {
  const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';

  return (
    <div role="alert" className="p-4 space-y-4 text-center border rounded-lg">
      <h2 className="text-lg font-semibold">Something went wrong:</h2>
      <pre className="text-red-500">{errorMessage}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </div>
  );
}
