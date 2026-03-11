import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json([
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
}
