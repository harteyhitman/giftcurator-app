import { NextRequest } from 'next/server';

import { proxyToBackend } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  return proxyToBackend(request, '/users/me');
}

export async function PATCH(request: NextRequest) {
  const body = await request.json();

  return proxyToBackend(request, '/users/me', {
    method: 'PATCH',
    body: JSON.stringify(body),
  });
}
