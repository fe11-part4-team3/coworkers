import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import KakaoProvider from 'next-auth/providers/kakao';

export const authOptions: NextAuthOptions = {
  // TODO 디버그 모드(실제 배포 시 false로 변경)
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID || '',
      clientSecret: process.env.KAKAO_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // STUB 구글 토큰 저장
        if (account.provider === 'google') {
          token.googleIdToken = account.id_token;
          token.googleAccessToken = account.access_token;
        }
        // STUB 카카오 토큰 저장
        if (account.provider === 'kakao') {
          token.kakaoAccessToken = account.access_token;
          token.kakaoRefreshToken = account.refresh_token;
          token.id = account.providerAccountId;
        }
      }
      return token;
    },
    async session({ session, token }) {
      // STUB 세션에 구글 토큰 저장
      if (token.googleIdToken) {
        session.googleIdToken = token.googleIdToken as string;
        session.googleAccessToken = token.googleAccessToken as string;
      }
      // STUB 세션에 카카오 토큰 저장
      if (token.kakaoAccessToken) {
        session.kakao = {
          accessToken: token.kakaoAccessToken as string,
          refreshToken: token.kakaoRefreshToken as string,
          id: token.id as number,
        };
      }

      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
