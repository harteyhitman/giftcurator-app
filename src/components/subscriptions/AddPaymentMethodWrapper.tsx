'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import AddPaymentMethod from './AddPaymentMethod';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function AddPaymentMethodWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <AddPaymentMethod />
    </Elements>
  );
}
