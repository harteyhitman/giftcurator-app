import { http, HttpResponse } from 'msw';

const dashboardHandlers = [
  http.get('/api/dashboard/metrics', () => {
    return HttpResponse.json({
      totalEvents: { value: 12, trend: 0.1 },
      activeBeneficiaries: { value: 5 },
      upcomingEvents: { value: 3 },
      subscriptionStatus: { value: 'Active' },
    });
  }),
  http.get('/api/dashboard/upcoming-events', () => {
    return HttpResponse.json([
      {
        id: '1',
        eventName: 'John Doe\'s Birthday',
        eventType: 'Birthday',
        beneficiaryName: 'John Doe',
        daysRemaining: 5,
        progress: 0.5,
      },
      {
        id: '2',
        eventName: 'Jane Smith\'s Wedding',
        eventType: 'Wedding',
        beneficiaryName: 'Jane Smith',
        daysRemaining: 12,
        progress: 0.2,
      },
      {
        id: '3',
        eventName: 'Peter Jones\'s Anniversary',
        eventType: 'Anniversary',
        beneficiaryName: 'Peter Jones',
        daysRemaining: 20,
        progress: 0.8,
      },
    ]);
  }),
  http.get('/api/dashboard/recent-activity', () => {
    return HttpResponse.json([
      {
        id: '1',
        activity: 'New beneficiary added: John Doe',
        timestamp: '2023-03-01T12:00:00Z',
      },
      {
        id: '2',
        activity: 'Event created: Jane Smith\'s Wedding',
        timestamp: '2023-03-01T11:00:00Z',
      },
      {
        id: '3',
        activity: 'Gift selected for Peter Jones\'s Anniversary',
        timestamp: '2023-03-01T10:00:00Z',
      },
      {
        id: '4',
        activity: 'Subscription changed to Pro',
        timestamp: '2023-03-01T09:00:00Z',
      },
    ]);
  }),
];

export default dashboardHandlers;
