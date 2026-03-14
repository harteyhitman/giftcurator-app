import { NextRequest, NextResponse } from 'next/server';

import { buildApiUrl } from '@/lib/api';
import { getAuthorizedHeaders } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json([], { status: 200 });
  }

  const [beneficiariesResponse, eventsResponse, profileResponse] = await Promise.all([
    fetch(buildApiUrl('/beneficiaries'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/events'), { headers, cache: 'no-store' }),
    fetch(buildApiUrl('/users/me'), { headers, cache: 'no-store' }),
  ]);

  const [beneficiaries, events, profile] = await Promise.all([
    beneficiariesResponse.json(),
    eventsResponse.json(),
    profileResponse.json(),
  ]);

  return NextResponse.json([
    {
      id: '1',
      question: 'How is my dashboard activity calculated?',
      answer: `Your dashboard currently reflects ${beneficiaries.length} beneficiaries, ${events.length} events, and your latest subscription status from your account profile.`,
      category: 'Dashboard',
    },
    {
      id: '2',
      question: 'How do I add a beneficiary?',
      answer: 'Open the Beneficiaries page, select Add Beneficiary, and save the person’s name, relationship, and date of birth.',
      category: 'Beneficiaries',
    },
    {
      id: '3',
      question: 'How do I create an event?',
      answer: 'Open the Events page, choose Create Event, link the event to a beneficiary, and save it to your calendar.',
      category: 'Events',
    },
    {
      id: '4',
      question: 'Where do I manage my account details?',
      answer: `Use Settings to update the profile for ${profile.firstName ?? 'your'} account, including email address and phone number.`,
      category: 'Account',
    },
    {
      id: '5',
      question: 'How do subscriptions affect my workspace?',
      answer: 'Subscriptions determine access level for reporting, gifting automation, and support experience. You can review available plans on the Subscriptions page.',
      category: 'Subscriptions',
    },
  ]);
}
