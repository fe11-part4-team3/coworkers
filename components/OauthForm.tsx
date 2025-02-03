import { useMutation } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { signInProvider } from '@/service/auth.api';
import useUser from '@/hooks/useUser';
import kakaoLogin from '@/hooks/useKakao';
import randomNumber5 from '@/utils/randomNumber';
import { getLoginProcessed } from '@/lib/kakaoStorage';

export default function OauthForm({ type }: { type: 'login' | 'signup' }) {
  const { data: session } = useSession();

  const { user, reload } = useUser();

  // TODO 디버그를 위한 로그
  console.log('🔹 세션 상태:', session);

  // STUB 제공된 api 소셜 로그인 mutate
  const { mutateAsync: postOauthLogin } = useMutation({
    mutationFn: signInProvider,
    onSuccess: () => {
      reload();
      console.log('간편 로그인 성공');
    },
    onError: () => {
      console.log('간편 로그인 실패');
    },
  });

  // 구글 로그인 클릭 시
  const handleGoogleSubmit = () => {
    signIn('google');
  };

  // 카카오 로그인 클릭 시
  const handleKakaoSubmit = () => {
    signIn('kakao');
  };

  // STUB 유저 정보가 없고, 구글 로그인 데이터가 있을 때
  useEffect(() => {
    if (!user && session?.googleIdToken) {
      const googleFormData = {
        provider: 'GOOGLE',
        state: 'authenticated',
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
        token: session?.googleIdToken || '',
      };

      postOauthLogin(googleFormData);
    }
  }, [user, session, postOauthLogin]);

  // STUB 유저 정보가 없고, 카카오 로그인 데이터가 있을 때, 로그인 처리가 되지 않았을 때(중복 로그인 방지)
  useEffect(() => {
    if (!user && session?.kakao?.accessToken && !getLoginProcessed()) {
      const kakaoFormData = {
        accessToken: session?.kakao.accessToken,
        refreshToken: session?.kakao.refreshToken,
        user: {
          id: session?.kakao.id,
          email: session?.user?.email || `${session?.kakao.id}@kakao.com`,
          nickname: `${session?.user?.name}${randomNumber5()}` || '',
          image: session?.user?.image || '',
        },
      };

      kakaoLogin(kakaoFormData, reload);
    }
  }, [session?.kakao?.accessToken, user, reload]);

  return (
    <>
      <div className="mb-pr-16 flex items-center justify-center gap-pr-24">
        <hr className="w-full" />
        <span className="text-16 mo:text-16m">OR</span>
        <hr className="w-full" />
      </div>
      <div className="flex justify-center gap-pr-16">
        <p className="flex-1">
          {type === 'login' ? '간편 로그인하기' : '간편 회원가입하기'}
        </p>

        <button className="icon_oauth-google" onClick={handleGoogleSubmit}>
          <span className="sr-only">구글 로그인</span>
        </button>

        <button className="icon_oauth-kakao" onClick={handleKakaoSubmit}>
          <span className="sr-only">카카오 로그인</span>
        </button>
      </div>
    </>
  );
}
