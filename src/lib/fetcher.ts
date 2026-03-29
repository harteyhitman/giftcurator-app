/** SWR helper: includes cookies, does not throw on HTTP errors (legacy dashboard usage). */
export function looseJsonFetcher(url: string) {
  return fetch(url, { credentials: 'include', cache: 'no-store' }).then((res) => res.json());
}

export const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
    cache: 'no-store',
  });

  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.') as Error & {
      info?: unknown;
      status?: number;
    };
    error.status = res.status;
    const contentType = res.headers.get('content-type');
    try {
      if (contentType?.includes('application/json')) {
        error.info = await res.json();
      } else {
        const text = await res.text();
        error.info = text ? { message: text } : {};
      }
    } catch {
      error.info = {};
    }
    throw error;
  }

  return res.json();
};
