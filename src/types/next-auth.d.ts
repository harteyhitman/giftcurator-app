import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string;
      mobileNumber?: string | null;
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
    user?: {
      id: string;
      name?: string | null;
      email?: string | null;
      mobileNumber?: string | null;
      accessToken?: string;
    };
  }
}
