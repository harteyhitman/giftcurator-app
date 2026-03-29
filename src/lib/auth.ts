import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

import { authApiFetch, getAuthApiBaseUrl } from '@/lib/api';

type AuthResponse = {
  access_token: string;
  user: {
    id: string;
    email: string;
    firstName?: string | null;
    lastName?: string | null;
    mobileNumber?: string | null;
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID ?? '',
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error('Email and password are required');
        }

        // Uses NEXT_PUBLIC_API_URL (or BACKEND_API_URL) → …/api/auth/login
        const data = await authApiFetch<AuthResponse>('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        return {
          id: data.user.id,
          name: [data.user.firstName, data.user.lastName].filter(Boolean).join(' '),
          email: data.user.email,
          mobileNumber: data.user.mobileNumber ?? null,
          accessToken: data.access_token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === 'linkedin') {
        throw new Error('LinkedIn sign-in is not wired to the API yet. Use email/password or Google.');
      }

      if (account?.provider === 'google' && account.id_token) {
        const res = await fetch(`${getAuthApiBaseUrl()}/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: account.id_token }),
        });
        if (!res.ok) {
          throw new Error(
            'Could not complete sign-in with the API. Check GOOGLE_CLIENT_ID on Render matches Vercel.',
          );
        }
        const data = (await res.json()) as AuthResponse;
        token.accessToken = data.access_token;
        token.user = {
          id: data.user.id,
          email: data.user.email,
          name:
            [data.user.firstName, data.user.lastName].filter(Boolean).join(' ') || profile?.name,
          mobileNumber: data.user.mobileNumber ?? null,
        };
        return token;
      }

      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.user = {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name,
          mobileNumber: user.mobileNumber ?? null,
        };
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          ...token.user,
          id: token.user.id,
        };
      }
      if (token.accessToken) {
        session.user.accessToken = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
