import { useCallback, useRef } from 'react';

import {
  getLoginProcessed,
  getProfileUpdated,
  setLoginProcessed,
  setProfileUpdated,
} from '@/lib/kakaoStorage';
import { signIn, signUp } from '@/service/auth.api';
import { updateUser } from '@/service/user.api';

interface IKakaoLogin {
  id: number;
  user: { email: string; nickname: string; image: string };
}

const useKakaoLogin = () => {
  // STUB 중복 로그인 방지 플래그
  const signInExecutedRef = useRef(false);

  const kakaoLogin = useCallback(
    async ({ id, user: userData }: IKakaoLogin, reload: () => void) => {
      if (getLoginProcessed()) return;

      // 로그인에 필요한 정보 추출
      const { email, nickname, image } = userData;

      // STUB 이메일 없을 경우, 임시 이메일 생성
      const userEmail = email || `${id}@kakao.com`;
      // STUB 비밀번호는 일반 사용자 ID와 동일하게 생성
      const userPassword = `${process.env.NEXT_PUBLIC_KAKAO_PASSWORD}${id}`;

      const handleSignUpAndSignIn = async () => {
        try {
          await signUp({
            email: userEmail,
            nickname,
            password: userPassword,
            passwordConfirmation: userPassword,
          });
        } catch (error) {
          interface ErrorResponse {
            response?: {
              status: number;
            };
          }
          const is400Error = (error as ErrorResponse).response?.status === 400;

          if (is400Error && !signInExecutedRef.current) {
            signInExecutedRef.current = true;
            await signIn({
              email: userEmail,
              password: userPassword,
            });
            console.log('[카카오] 로그인 완료');
            setLoginProcessed();

            if (!getProfileUpdated()) {
              await updateUser({
                image: image || '',
              });
              console.log('프로필 업데이트 완료');
              setProfileUpdated();
            }
          }
        } finally {
          reload();
        }
      };

      await handleSignUpAndSignIn();
    },
    [],
  );

  return kakaoLogin;
};

export default useKakaoLogin;
