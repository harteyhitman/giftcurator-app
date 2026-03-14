import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

function hasWord(message: string, word: string) {
  return new RegExp(`\\b${word}\\b`, 'i').test(message);
}

export async function POST(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);
  const { message } = (await request.json()) as { message: string };
  const normalizedMessage = message.trim().toLowerCase();

  if (!headers) {
    return NextResponse.json({ response: 'Please sign in again so I can help with your workspace.' });
  }

  const [beneficiariesResponse, eventsResponse] = await Promise.all([
    fetch(buildApiUrl('/beneficiaries'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/events'), { headers, cache: 'no-store' }),
  ]);

  const [beneficiaries, events] = await Promise.all([
    beneficiariesResponse.json(),
    eventsResponse.json(),
  ]);

  let responseMessage =
    `You currently have ${beneficiaries.length} beneficiaries and ${events.length} events. Ask me about settings, subscriptions, reports, beneficiaries, or events and I’ll guide you.`;

  if (normalizedMessage.includes('subscription') || hasWord(normalizedMessage, 'plan')) {
    responseMessage = 'The Subscriptions page shows your active plan, billing history, payment method details, and available upgrades.';
  } else if (normalizedMessage.includes('report')) {
    responseMessage = 'The Reports page summarizes total spend, event activity by month, gift type distribution, and spending by beneficiary.';
  } else if (normalizedMessage.includes('setting') || normalizedMessage.includes('profile')) {
    responseMessage = 'Use Settings to update your profile details, notification preferences, and security setup.';
  } else if (normalizedMessage.includes('beneficiary')) {
    responseMessage =
      beneficiaries.length > 0
        ? `You already have ${beneficiaries.length} beneficiaries. Open the Beneficiaries page to review profiles or add another person.`
        : 'You do not have any beneficiaries yet. Open the Beneficiaries page and choose Add Beneficiary to get started.';
  } else if (normalizedMessage.includes('event')) {
    responseMessage =
      events.length > 0
        ? `You currently have ${events.length} events scheduled. Open the Events page to review the calendar or create another event.`
        : 'You do not have any scheduled events yet. Open the Events page and choose Create Event to add one.';
  } else if (hasWord(normalizedMessage, 'hello') || hasWord(normalizedMessage, 'hi')) {
    responseMessage = `Hello! Your workspace currently has ${beneficiaries.length} beneficiaries and ${events.length} planned events. How can I help?`;
  }

  return NextResponse.json({ response: responseMessage });
}
