// import { getProfileUpdated } from '@/lib/kakaoStorage';
import { useCallback } from 'react';

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
  const kakaoLogin = useCallback(
    async ({ id, user: userData }: IKakaoLogin, reload: () => void) => {
      if (getLoginProcessed()) return;

      // 로그인에 필요한 정보 추출
      const { email, nickname, image } = userData;

      // STUB 이메일 없을 경우, 임시 이메일 생성
      const userEmail = email || `${id}@kakao.com`;
      // STUB 비밀번호는 일반 사용자 ID와 동일하게 생성
      // REVIEW 보안 이슈가 있을 수 있음
      const userPassword = `kakao${id}!`;

      try {
        await signUp({
          email: userEmail,
          nickname,
          password: userPassword,
          passwordConfirmation: userPassword,
        });
      } catch {
        await signIn({
          email: userEmail,
          password: userPassword,
        });

        console.log('[카카오] 로그인 완료');
      }

      setLoginProcessed();

      // STUB 프로필 업데이트 (한 번만 실행)

      if (!getProfileUpdated()) {
        await updateUser({
          image: image || '',
        });
        console.log('프로필 업데이트 완료');
        setProfileUpdated();
      }

      // STUB 로그인 처리 완료
      reload();
    },
    [],
  );

  return kakaoLogin;
};

export default useKakaoLogin;
