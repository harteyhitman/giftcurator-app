import { NextRequest, NextResponse } from 'next/server';

import { getAuthorizedHeaders, safeBackendFetch } from '@/lib/server-api';

const PLANS = [
  {
    name: 'Basic',
    price: { monthly: 10, annual: 100 },
    features: ['Up to 10 beneficiaries', 'Basic reporting', 'Email support'],
    popular: false,
  },
  {
    name: 'Gold',
    price: { monthly: 25, annual: 250 },
    features: ['Up to 50 beneficiaries', 'Advanced reporting', 'Priority email support', 'Gift tracking'],
    popular: true,
  },
  {
    name: 'Premium',
    price: { monthly: 50, annual: 500 },
    features: [
      'Unlimited beneficiaries',
      'Advanced reporting and analytics',
      '24/7 phone and email support',
      'Gift tracking and automation',
      'Personalized gift recommendations',
    ],
    popular: false,
  },
];

function getPlanPricing(planName?: string | null) {
  const matchedPlan = PLANS.find((plan) => plan.name.toLowerCase() === (planName ?? '').toLowerCase());
  return matchedPlan?.price.monthly ?? 0;
}

function inferNextBillingDate(startDate?: string | null, endDate?: string | null) {
  if (endDate) {
    return endDate;
  }

  if (!startDate) {
    return new Date().toISOString();
  }

  const nextDate = new Date(startDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate.toISOString();
}

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const result = await safeBackendFetch<{ subscriptions?: Array<{ id: string; plan?: string; status?: string; startDate?: string; endDate?: string }> }>('/users/me', request);
  const profile = result.ok ? result.data : null;
  const subscriptions = Array.isArray(profile?.subscriptions) ? profile.subscriptions : [];
  const latestSubscription = subscriptions[0];
  const currentPlanName = latestSubscription?.plan ?? 'Basic';

  return NextResponse.json({
    plans: PLANS,
    currentPlan: {
      name: currentPlanName,
      status: latestSubscription?.status ?? 'INACTIVE',
      nextBillingDate: inferNextBillingDate(latestSubscription?.startDate, latestSubscription?.endDate),
      paymentMethod: {
        type: 'Visa',
        last4: '4242',
        expiry: '12/28',
      },
    },
    billingHistory: subscriptions.map((subscription) => ({
      id: subscription.id,
      date: subscription.startDate,
      amount: getPlanPricing(subscription.plan),
      status: subscription.status,
    })),
  });
}
