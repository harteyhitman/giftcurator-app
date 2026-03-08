'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import Fallback from './Fallback';

export default function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={Fallback}>
      {children}
    </ReactErrorBoundary>
  );
}
