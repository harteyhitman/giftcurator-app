import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { buildApiUrl } from '@/lib/api';

/**
 * Fetch from backend; on network error or non-2xx, returns null so callers can return fallback data.
 */
export async function safeBackendFetch<T = unknown>(
  path: string,
  request: NextRequest,
): Promise<{ ok: true; data: T } | { ok: false }> {
  const headers = await getAuthorizedHeaders(request);
  if (!headers) {
    return { ok: false };
  }
  try {
    const response = await fetch(buildApiUrl(path), { headers, cache: 'no-store' });
    if (!response.ok) {
      return { ok: false };
    }
    const data = (await response.json()) as T;
    return { ok: true, data };
  } catch {
    return { ok: false };
  }
}

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

  let response: Response;
  try {
    response = await fetch(buildApiUrl(path), {
      ...init,
      headers: {
        ...headers,
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      {
        message:
          'Cannot reach the API backend. Set BACKEND_API_URL or NEXT_PUBLIC_API_URL (e.g. https://giftcurator-backend.onrender.com) and restart the dev server.',
      },
      { status: 503 },
    );
  }

  const responseText = await response.text();
  const isJson = response.headers.get('content-type')?.includes('application/json');

  return new NextResponse(responseText, {
    status: response.status,
    headers: isJson ? { 'Content-Type': 'application/json' } : undefined,
  });
}
