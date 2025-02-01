import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.idToken = account.id_token; // Google ID 토큰 저장(로그인 시 필요)
        token.accessToken = account.access_token; // Google Access Token 저장(탈퇴 시 필요)
      }
      return token;
    },
    async session({ session, token }) {
      session.idToken = token.idToken as string; // 세션에 ID 토큰 추가(로그인 시 필요)
      session.accessToken = token.accessToken as string; // 세션에 Access Token 추가(탈퇴 시 필요)
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
