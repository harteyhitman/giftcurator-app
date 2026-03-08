'use client';

import { useNetworkState } from 'react-use';

export default function OfflineIndicator() {
  const { online } = useNetworkState();

  if (online) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-white bg-red-500">
      You are currently offline.
    </div>
  );
}
