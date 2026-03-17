import { NextRequest, NextResponse } from 'next/server';

import { proxyToBackend, safeBackendFetch } from '@/lib/server-api';

export async function GET(request: NextRequest) {
  const result = await safeBackendFetch<unknown[]>('/beneficiaries', request);
  if (!result.ok) {
    return NextResponse.json([], { status: 200 });
  }
  return NextResponse.json(Array.isArray(result.data) ? result.data : []);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  return proxyToBackend(request, '/beneficiaries', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
