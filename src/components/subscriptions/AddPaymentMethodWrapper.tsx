'use client';

import { useMemo } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddPaymentMethod from './AddPaymentMethod';
import { Card, CardContent } from '@/components/ui/card';

export default function AddPaymentMethodWrapper() {
  const stripePromise = useMemo(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    if (window.location.protocol !== 'https:') {
      return null;
    }

    const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    return publishableKey ? loadStripe(publishableKey) : null;
  }, []);

  if (!stripePromise) {
    return (
      <Card className="rounded-2xl border-primary/10">
        <CardContent className="p-6 text-sm text-muted-foreground">
          Card collection is only enabled in a secure HTTPS environment. This will work on your Vercel production deployment.
        </CardContent>
      </Card>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <AddPaymentMethod />
    </Elements>
  );
}
