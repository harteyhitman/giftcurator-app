import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { message } = await request.json() as { message: string };
  let responseMessage = "I'm sorry, I don't understand. Can you rephrase?";

  if (message.toLowerCase().includes('hello')) {
    responseMessage = 'Hi there! How can I help you today?';
  } else if (message.toLowerCase().includes('beneficiary')) {
    responseMessage = 'You can manage your beneficiaries on the Beneficiaries page.';
  } else if (message.toLowerCase().includes('event')) {
    responseMessage = 'You can create and manage events on the Events page.';
  }

  return NextResponse.json({ response: responseMessage });
}
