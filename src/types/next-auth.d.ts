import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      mobileNumber?: string | null;
      /** NestJS API JWT — mirrored from the NextAuth JWT for client checks only; API routes read the cookie JWT. */
      accessToken?: string;
    };
  }

  interface User {
    id: string;
    mobileNumber?: string | null;
    accessToken?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    /** Backend Bearer token (Nest JWT). Stored at top level for reliable getToken() access. */
    accessToken?: string;
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      mobileNumber?: string | null;
    };
  }
}
