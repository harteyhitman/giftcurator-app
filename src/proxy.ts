import { NextRequest, NextResponse } from 'next/server';
import { rateLimit } from '@daveyplate/next-rate-limit';
import { getToken } from 'next-auth/jwt';

export async function proxy(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  const isAuthPage =
    pathname.startsWith('/login') ||
    pathname.startsWith('/signup') ||
    pathname.startsWith('/reset-password');

  const isDashboardPage =
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/beneficiaries') ||
    pathname.startsWith('/events') ||
    pathname.startsWith('/reports') ||
    pathname.startsWith('/settings') ||
    pathname.startsWith('/subscriptions') ||
    pathname.startsWith('/support') ||
    pathname.startsWith('/notifications');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (isDashboardPage && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  const response = NextResponse.next();
  const shouldRateLimitAuthApi =
    pathname === '/api/auth/signin' || pathname.startsWith('/api/auth/callback');

  if (shouldRateLimitAuthApi) {
    return rateLimit({ request, response });
  }

  return response;
}

export const config = {
  matcher: [
    '/api/auth/:path*',
    '/login',
    '/signup',
    '/reset-password',
    '/dashboard/:path*',
    '/beneficiaries/:path*',
    '/events/:path*',
    '/reports/:path*',
    '/settings/:path*',
    '/subscriptions/:path*',
    '/support/:path*',
    '/notifications/:path*',
  ],
};
