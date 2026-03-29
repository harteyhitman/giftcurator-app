/**
 * Lightweight server-side checks (no secrets logged). Expand with zod if needed.
 */
export function warnIfAuthEnvIncomplete(): void {
  if (process.env.NODE_ENV === 'production') {
    if (!process.env.NEXTAUTH_SECRET?.trim()) {
      console.error('[env] NEXTAUTH_SECRET is required in production.');
    }
    if (!process.env.NEXTAUTH_URL?.trim()) {
      console.error('[env] NEXTAUTH_URL should be set to your canonical app URL in production.');
    }
    if (!process.env.NEXT_PUBLIC_API_URL?.trim() && !process.env.BACKEND_API_URL?.trim()) {
      console.error(
        '[env] Set NEXT_PUBLIC_API_URL and/or BACKEND_API_URL so the app can reach the Nest API.',
      );
    }
  }
}
