import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session extends DefaultSession {
    googleAccessToken?: string;
    googleIdToken?: string;
    kakaoAccessToken?: string;
    id?: number;
  }

  export interface JWT {
    googleAccessToken?: string;
    googleIdToken?: string;
    kakaoAccessToken?: string;
  }
}
