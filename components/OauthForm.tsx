import { useMutation } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useCallback, useEffect } from 'react';

import { signInProvider } from '@/service/auth.api';
import useUser from '@/hooks/useUser';
import useKakaoLogin from '@/hooks/useKakao';
import { generateRandomNumber } from '@/utils/randomCode';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useUserStore from '@/stores/useUser.store';

export default function OauthForm({ type }: { type: 'login' | 'signup' }) {
  const { user, reload } = useUser();

  const { showSnackbar } = useSnackbar();

  const { data: session } = useSession();

  const kakaoLogin = useKakaoLogin();

  // STUB 제공된 api 소셜 로그인 mutate
  const { mutateAsync: postOauthLogin } = useMutation({
    mutationFn: signInProvider,
    onSuccess: () => {
      const { setToken } = useUserStore.getState();

      if (session?.googleIdToken) {
        setToken(session.googleIdToken);
      } else if (session?.kakaoAccessToken) {
        setToken(session.kakaoAccessToken);
      }

      reload();
      showSnackbar('간편 로그인 성공');
    },
    onError: () => showSnackbar('간편 로그인 실패', 'error'),
  });

  // 구글 로그인 클릭 시
  const handleGoogleSubmit = useCallback(() => {
    signIn('google', { redirect: false });
  }, []);

  // 카카오 로그인 클릭 시
  const handleKakaoSubmit = useCallback(() => {
    signIn('kakao', { redirect: false });
  }, []);

  useEffect(() => {
    if (!session) return;

    if (session?.googleIdToken) {
      // STUB 유저 정보가 없고, 구글 로그인 데이터가 있을 때
      const googleFormData = {
        provider: 'GOOGLE',
        state: 'authenticated',
        redirectUri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
        token: session?.googleIdToken,
      };

      postOauthLogin(googleFormData);
    } else if (session?.kakaoAccessToken) {
      // STUB 유저 정보가 없고, 카카오 로그인 데이터가 있을 때, 로그인 처리가 되지 않았을 때(중복 로그인 방지)
      const kakaoFormData = {
        id: session.id || 0,
        user: {
          email: session?.user?.email || `${session?.id}@kakao.com`,
          nickname: `${session?.user?.name}${generateRandomNumber(5)}`,
          image: session?.user?.image || '',
        },
        accessToken: session.kakaoAccessToken, // 세션에 저장된 최신 토큰 사용
      };

      kakaoLogin(kakaoFormData, reload);
    }
  }, [session, user]);

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
