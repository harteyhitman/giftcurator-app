const LOCAL_API_BASE_URL = 'http://localhost:4000/api';

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function toApiBaseUrl(raw: string) {
  const normalized = stripTrailingSlash(raw.trim());
  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
}

/**
 * Server-side Nest API base (…/api). Prefer BACKEND_API_URL on Vercel so serverless
 * calls the backend directly; fall back to NEXT_PUBLIC_API_URL, then local default.
 */
export function getApiBaseUrl() {
  const isServer = typeof window === 'undefined';
  const serverBase =
    isServer && process.env.BACKEND_API_URL?.trim()
      ? toApiBaseUrl(process.env.BACKEND_API_URL)
      : '';
  const publicBase = process.env.NEXT_PUBLIC_API_URL?.trim()
    ? toApiBaseUrl(process.env.NEXT_PUBLIC_API_URL)
    : '';

  if (serverBase) return serverBase;
  if (publicBase) return publicBase;
  return LOCAL_API_BASE_URL;
}

/**
 * Base URL for NextAuth credential / Google token exchange. Uses NEXT_PUBLIC_API_URL
 * first so login matches the same API the browser targets; then BACKEND_API_URL; then getApiBaseUrl().
 */
export function getAuthApiBaseUrl(): string {
  const preferred =
    process.env.NEXT_PUBLIC_API_URL?.trim() || process.env.BACKEND_API_URL?.trim();
  if (preferred) {
    return toApiBaseUrl(preferred);
  }
  return getApiBaseUrl();
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}

/** Same as apiFetch but uses getAuthApiBaseUrl() — use for /auth/login, /auth/register from NextAuth. */
export async function authApiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const url = `${getAuthApiBaseUrl()}${normalizedPath}`;
  const response = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;
    let message = fallbackMessage;

    try {
      const errorBody = await response.json();
      message =
        errorBody?.message ||
        errorBody?.error ||
        (Array.isArray(errorBody) ? errorBody.join(', ') : fallbackMessage);
    } catch {
      message = fallbackMessage;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(buildApiUrl(path), {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const fallbackMessage = `Request failed with status ${response.status}`;
    let message = fallbackMessage;

    try {
      const errorBody = await response.json();
      message =
        errorBody?.message ||
        errorBody?.error ||
        (Array.isArray(errorBody) ? errorBody.join(', ') : fallbackMessage);
    } catch {
      message = fallbackMessage;
    }

    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
