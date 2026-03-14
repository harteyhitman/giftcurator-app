const LOCAL_API_BASE_URL = 'http://localhost:4000/api';

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, '');
}

export function getApiBaseUrl() {
  const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

  if (!configuredBaseUrl) {
    return LOCAL_API_BASE_URL;
  }

  const normalizedBaseUrl = stripTrailingSlash(configuredBaseUrl);
  return normalizedBaseUrl.endsWith('/api')
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;
}

export function buildApiUrl(path: string) {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
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
