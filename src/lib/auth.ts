import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

import { apiFetch } from '@/lib/api';

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

        const data = await apiFetch<AuthResponse>('/auth/login', {
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
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user as typeof session.user;
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
