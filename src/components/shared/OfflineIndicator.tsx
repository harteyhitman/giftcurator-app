'use client';

import { useEffect, useState } from 'react';
import { useNetworkState } from 'react-use';

export default function OfflineIndicator() {
  const { online } = useNetworkState();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted || online !== false) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 text-center text-white bg-red-500">
      You are currently offline.
    </div>
  );
}
