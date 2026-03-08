import { http, HttpResponse } from 'msw';

const subscriptionHandlers = [
  http.get('/api/subscriptions', () => {
    return HttpResponse.json({
      plans: [
        {
          name: 'Basic',
          price: { monthly: 10, annual: 100 },
          features: [
            'Up to 10 beneficiaries',
            'Basic reporting',
            'Email support',
          ],
          popular: false,
        },
        {
          name: 'Gold',
          price: { monthly: 25, annual: 250 },
          features: [
            'Up to 50 beneficiaries',
            'Advanced reporting',
            'Priority email support',
            'Gift tracking',
          ],
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
      ],
      currentPlan: {
        name: 'Gold',
        nextBillingDate: '2024-09-01',
        paymentMethod: {
          type: 'card',
          last4: '4242',
          expiry: '12/24',
        },
      },
      billingHistory: [
        {
          id: '1',
          date: '2024-08-01',
          amount: 25.0,
          status: 'Paid',
        },
        {
          id: '2',
          date: '2024-07-01',
          amount: 25.0,
          status: 'Paid',
        },
      ],
    });
  }),
];

export default subscriptionHandlers;
