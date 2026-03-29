import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { buildApiUrl } from '@/lib/api';

type DecodedJwt = Awaited<ReturnType<typeof getToken>>;

function readAccessToken(token: DecodedJwt): string | undefined {
  if (!token || typeof token !== 'object') return undefined;
  const t = token as { accessToken?: string; user?: { accessToken?: string } };
  if (t.accessToken) return t.accessToken;
  // Legacy sessions that stored the API token only on token.user
  return t.user?.accessToken;
}

async function getJwt(request: NextRequest) {
  return getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });
}

/**
 * Nest API Bearer token from the encrypted NextAuth JWT cookie.
 */
export async function getAccessToken(request: NextRequest): Promise<string | undefined> {
  const token = await getJwt(request);
  return readAccessToken(token);
}

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

const UNAUTHORIZED_BODY = {
  message:
    'No backend access token in your session. Sign out and sign in again (email/password or Google). If it keeps happening, set NEXTAUTH_SECRET in .env.local and restart the dev server.',
} as const;

export async function proxyToBackend(
  request: NextRequest,
  path: string,
  init?: RequestInit,
) {
  const token = await getJwt(request);
  const accessToken = readAccessToken(token);

  if (process.env.NODE_ENV === 'development') {
    // Never log the raw token — only whether the session carries one
    console.log('[api-proxy]', request.method, path, 'jwt:', Boolean(token), 'accessToken:', Boolean(accessToken));
  }

  if (!accessToken) {
    return NextResponse.json(UNAUTHORIZED_BODY, { status: 401 });
  }

  const authHeaders = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  let response: Response;
  try {
    response = await fetch(buildApiUrl(path), {
      ...init,
      headers: {
        ...authHeaders,
        ...(init?.headers ?? {}),
      },
      cache: 'no-store',
    });
  } catch {
    return NextResponse.json(
      {
        message:
          'Cannot reach the API backend. Set BACKEND_API_URL or NEXT_PUBLIC_API_URL (e.g. https://your-api.onrender.com) and restart the dev server.',
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
