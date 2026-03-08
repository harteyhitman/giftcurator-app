import { http, HttpResponse } from 'msw';

const beneficiaryHandlers = [
  http.get('/api/beneficiaries', () => {
    return HttpResponse.json([
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        relationship: 'Friend',
        dob: '1990-01-01',
        upcomingEvents: 2,
        createdAt: '2023-01-01T12:00:00Z',
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        relationship: 'Family',
        dob: '1992-05-10',
        upcomingEvents: 1,
        createdAt: '2023-02-01T12:00:00Z',
      },
    ]);
  }),
  http.get('/api/beneficiaries/:id', ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json({
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        mobile: '123-456-7890',
        dob: '1990-01-01',
        address: '123 Main St, Anytown, USA',
        relationship: 'Friend',
        gender: 'male',
        upcomingEvents: [
          {
            id: '1',
            eventName: 'John Doe\'s Birthday',
            eventType: 'Birthday',
            daysRemaining: 5,
            progress: 0.5,
          },
        ],
        pastGifts: [
          {
            id: '1',
            giftName: 'Amazon Gift Card',
            date: '2022-12-25',
            amount: 50,
          },
        ],
        notes: 'Loves hiking and reading.',
        timeline: [
          { id: '1', event: 'Beneficiary added', date: '2023-01-01' },
          { id: '2', event: 'Gift sent', date: '2022-12-25' },
        ],
      });
    }
  }),
];

export default beneficiaryHandlers;
