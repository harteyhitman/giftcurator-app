import { http, HttpResponse } from 'msw';

const supportHandlers = [
  http.get('/api/support/faq', () => {
    return HttpResponse.json([
      {
        id: '1',
        question: 'What is Gifting?',
        answer: 'Gifting is a platform that helps you manage and track your gift-giving.',
        category: 'General',
      },
      {
        id: '2',
        question: 'How do I add a beneficiary?',
        answer: 'You can add a beneficiary from the Beneficiaries page.',
        category: 'Beneficiaries',
      },
      {
        id: '3',
        question: 'How do I create an event?',
        answer: 'You can create an event from the Events page.',
        category: 'Events',
      },
    ]);
  }),
  http.post('/api/support/chat', async ({ request }) => {
    const { message } = await request.json() as { message: string };
    let responseMessage = "I'm sorry, I don't understand. Can you rephrase?";

    if (message.toLowerCase().includes('hello')) {
      responseMessage = 'Hi there! How can I help you today?';
    } else if (message.toLowerCase().includes('beneficiary')) {
      responseMessage = 'You can manage your beneficiaries on the Beneficiaries page.';
    } else if (message.toLowerCase().includes('event')) {
      responseMessage = 'You can create and manage events on the Events page.';
    }

    return HttpResponse.json({ response: responseMessage });
  }),
];

export default supportHandlers;
