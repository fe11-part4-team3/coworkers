import { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  export interface Session extends DefaultSession {
    googleAccessToken?: string;
    googleIdToken?: string;
    kakaoAccessToken?: string;
    kakao: {
      accessToken: string;
      refreshToken: string;
      id: number;
    };
  }

  export interface JWT {
    googleAccessToken?: string;
    googleIdToken?: string;
    kakaoAccessToken?: string;
  }
}
