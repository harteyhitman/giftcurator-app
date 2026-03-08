import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import LinkedInProvider from 'next-auth/providers/linkedin';

const failedLoginAttempts = new Map<string, number>();
const maxAttempts = 5;

const handler = NextAuth({
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
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const ip = (credentials as any).ip ?? '127.0.0.1';
        const attempts = failedLoginAttempts.get(ip) ?? 0;

        if (attempts >= maxAttempts) {
          throw new Error('Too many failed login attempts. Please try again later.');
        }

        // Add your own authentication logic here
        if (credentials?.username === 'admin' && credentials?.password === 'admin') {
          failedLoginAttempts.delete(ip);
          return { id: '1', name: 'Admin', email: 'admin@example.com' };
        }

        failedLoginAttempts.set(ip, attempts + 1);
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/signup',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: `__Secure-next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
});

export { handler as GET, handler as POST };
