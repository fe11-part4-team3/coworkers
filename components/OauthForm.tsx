import { useMutation } from '@tanstack/react-query';
import { signIn, useSession } from 'next-auth/react';
import { useEffect } from 'react';

import { signInProvider } from '@/service/auth.api';
import useUser from '@/hooks/useUser';
// import useForm from '@/hooks/useForm';

export default function OauthForm({ type }: { type: 'login' | 'signup' }) {
  const session = useSession();

  const { user, reload } = useUser();

  console.log('🔹 세션 상태:', session);

  const { mutateAsync: postOauthLogin } = useMutation({
    mutationFn: signInProvider,
    onSuccess: (res) => {
      alert('(oauth)로그인이 완료 되었습니다.');
      reload();
      console.log('로그인 완료 : ', res);
    },
    onError: (err) => {
      console.error('로그인 실패:', err);
      alert('로그인 중 문제가 발생했습니다.');
    },
  });

  const handleGoogleSubmit = async () => {
    // 구글 로그인
    const result = await signIn('google', {
      prompt: 'select_account',
      redirect: true,
    });

    if (result?.error) {
      console.error('Google 로그인 실패:', result.error);
    } else {
      console.log('Google 로그인 성공:', result);
    }
  };

  useEffect(() => {
    // 로그인 상태이고, 세션에 idToken이 존재하면
    if (!user && session.status === 'authenticated' && session.data?.idToken) {
      // 구글 로그인 데이터
      const googleFormData = {
        provider: 'GOOGLE',
        state: 'authenticated',
        redirectUri: 'http://localhost:3000/api/auth/callback/google',
        token: session.data?.idToken || '',
      };
      console.log('🔹 Google 인증 완료, 백엔드 로그인 실행 중...');

      // 백엔드 로그인
      postOauthLogin(googleFormData);
    }
  }, [session.status, session.data?.idToken, postOauthLogin, user]);

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

        <button
          className="icon_oauth-kakao"
          onClick={() => console.log('카카오 로그인 클릭')}
        >
          <span className="sr-only">카카오 로그인</span>
        </button>
      </div>
    </>
  );
}
