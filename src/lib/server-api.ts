import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { buildApiUrl } from '@/lib/api';

export async function getAccessToken(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return token?.user?.accessToken;
}

export async function getAuthorizedHeaders(request: NextRequest) {
  const accessToken = await getAccessToken(request);

  if (!accessToken) {
    return null;
  }

  return {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
}

export async function proxyToBackend(
  request: NextRequest,
  path: string,
  init?: RequestInit,
) {
  const headers = await getAuthorizedHeaders(request);

  if (!headers) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers: {
      ...headers,
      ...(init?.headers ?? {}),
    },
    cache: 'no-store',
  });

  const responseText = await response.text();
  const isJson = response.headers.get('content-type')?.includes('application/json');

  return new NextResponse(responseText, {
    status: response.status,
    headers: isJson ? { 'Content-Type': 'application/json' } : undefined,
  });
}
