import { NextResponse, NextRequest } from 'next/server';
import { rateLimit } from '@daveyplate/next-rate-limit';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const pathname = request.nextUrl.pathname;
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') || 
                     request.nextUrl.pathname.startsWith('/signup') ||
                     request.nextUrl.pathname.startsWith('/reset-password');
  
  const isDashboardPage = request.nextUrl.pathname.startsWith('/dashboard') ||
                          request.nextUrl.pathname.startsWith('/beneficiaries') ||
                          request.nextUrl.pathname.startsWith('/events') ||
                          request.nextUrl.pathname.startsWith('/reports') ||
                          request.nextUrl.pathname.startsWith('/settings');

  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
    return NextResponse.next();
  }

  if (isDashboardPage) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  const response = NextResponse.next();
  const shouldRateLimitAuthApi =
    pathname === '/api/auth/signin' || pathname.startsWith('/api/auth/callback');

  if (shouldRateLimitAuthApi) {
    return await rateLimit({ request, response });
  }
  return response;
}

export const config = {
  matcher: ['/api/auth/:path*', '/login', '/signup', '/reset-password', '/dashboard/:path*', '/beneficiaries/:path*', '/events/:path*', '/reports/:path*', '/settings/:path*'],
};
