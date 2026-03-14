import { NextRequest } from 'next/server';

import { proxyToBackend } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, '/events');
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyToBackend(request, '/events', {
    method: 'POST',
    body: JSON.stringify({
      title: body.title,
      type: body.type,
      date: body.date,
      beneficiaryId: body.beneficiaryId,
    }),
  });
}
