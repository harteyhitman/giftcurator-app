import { http, HttpResponse } from 'msw';

const eventHandlers = [
  http.post('/api/events', async ({ request }) => {
    const data = await request.json();
    if (typeof data === 'object' && data !== null) {
      return HttpResponse.json({ id: '123', ...data });
    }
    return HttpResponse.json({ id: '123' });
  }),
  http.get('/api/events', () => {
    return HttpResponse.json([
      {
        id: '1',
        title: 'John Doe\'s Birthday',
        date: '2024-08-10',
      },
      {
        id: '2',
        title: 'Jane Smith\'s Wedding',
        date: '2024-08-20',
      },
    ]);
  }),
];

export default eventHandlers;
