import { useState, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export function useFingerprint() {
  const [fingerprint, setFingerprint] = useState<string | null>(null);

  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      setFingerprint(visitorId);
    };

    getFingerprint();
  }, []);

  return fingerprint;
}
