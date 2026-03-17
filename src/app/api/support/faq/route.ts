import { NextRequest, NextResponse } from 'next/server';

import { safeBackendFetch } from '@/lib/server-api';

const DEFAULT_FAQS = [
  { id: '1', question: 'How is my dashboard activity calculated?', answer: 'Your dashboard reflects your beneficiaries, events, and subscription status from your account profile.', category: 'Dashboard' },
  { id: '2', question: 'How do I add a beneficiary?', answer: "Open the Beneficiaries page, select Add Beneficiary, and save the person's name, relationship, and date of birth.", category: 'Beneficiaries' },
  { id: '3', question: 'How do I create an event?', answer: 'Open the Events page, choose Create Event, link the event to a beneficiary, and save it to your calendar.', category: 'Events' },
  { id: '4', question: 'Where do I manage my account details?', answer: 'Use Settings to update your profile, including email address and phone number.', category: 'Account' },
  { id: '5', question: 'How do subscriptions affect my workspace?', answer: 'Subscriptions determine access level for reporting, gifting automation, and support. You can review plans on the Subscriptions page.', category: 'Subscriptions' },
];

export async function GET(request: NextRequest) {
  const [beneficiariesResult, eventsResult, profileResult] = await Promise.all([
    safeBackendFetch<unknown[]>('/beneficiaries', request),
    safeBackendFetch<unknown[]>('/events', request),
    safeBackendFetch<{ firstName?: string }>('/users/me', request),
  ]);

  const beneficiaries = beneficiariesResult.ok && Array.isArray(beneficiariesResult.data) ? beneficiariesResult.data : [];
  const events = eventsResult.ok && Array.isArray(eventsResult.data) ? eventsResult.data : [];
  const profile = profileResult.ok ? profileResult.data : null;

  return NextResponse.json([
    { ...DEFAULT_FAQS[0], answer: `Your dashboard currently reflects ${beneficiaries.length} beneficiaries, ${events.length} events, and your latest subscription status from your account profile.` },
    DEFAULT_FAQS[1],
    DEFAULT_FAQS[2],
    { ...DEFAULT_FAQS[3], answer: `Use Settings to update the profile for ${profile?.firstName ?? 'your'} account, including email address and phone number.` },
    DEFAULT_FAQS[4],
  ]);
}
