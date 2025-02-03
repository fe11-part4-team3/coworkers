import {
  getKakaoAccessToken,
  getLoginProcessed,
  getProfileUpdated,
  setLoginProcessed,
  setProfileUpdated,
} from '@/lib/kakaoStorage';
import { signIn, signUp } from '@/service/auth.api';
import { updateUser } from '@/service/user.api';

interface IKakaoLogin {
  accessToken: string;
  refreshToken: string;
  user: { email: string; nickname: string; id: number; image: string };
}

const kakaoLogin = async (
  { accessToken, refreshToken, user: userData }: IKakaoLogin,
  reload: () => void,
) => {
  // 만약 이미 처리된 경우, 중복 실행 방지
  if (getLoginProcessed()) {
    return;
  }

  // 로그인에 필요한 정보 추출
  const { email, nickname, id, image } = userData;

  // STUB 이메일 없을 경우, 임시 이메일 생성
  const userEmail = email || `${id}@kakao.com`;
  // STUB 비밀번호는 일반 사용자 ID와 동일하게 생성
  // REVIEW 보안 이슈가 있을 수 있음
  const userPassword = `kakao${id}!`;

  if (getKakaoAccessToken()) {
    // STUB 기존 사용자: 로그인 시도
    try {
      await signIn({
        email: userEmail,
        password: userPassword,
      });
      alert('[카카오] 간편 로그인 완료 (이미 토큰 존재)');
      console.log('간편 로그인 완료 (이미 토큰 존재)');
    } catch (error) {
      console.error('로그인 실패:', error);
    }
  } else {
    // STUB 신규 사용자: 회원가입 시도
    await signUp({
      email: userEmail,
      nickname,
      password: userPassword,
      passwordConfirmation: userPassword,
    });
    // STUB 회원가입 성공 후 로그인 시도
    try {
      await signIn({
        email: userEmail,
        password: userPassword,
      });
      alert('[카카오] 간편 회원가입 및 로그인 완료');
      console.log('간편 회원가입 및 로그인 완료');
    } catch (signInError) {
      console.error('간편 회원가입 및 로그인 실패:', signInError);
    }
  }

  // STUB 프로필 업데이트 (한 번만 실행)
  if (!getProfileUpdated()) {
    try {
      await updateUser({
        image: image || '',
      });
      console.log('프로필 업데이트 완료');

      // STUB 프로필 업데이트 완료 시 로컬 스토리지에 저장
      setProfileUpdated();
    } catch {
      console.log('프로필 업데이트 실패');
    }
  }

  // STUB 로그인 처리 완료
  localStorage.setItem('kakaoAccessToken', accessToken);
  localStorage.setItem('kakaoRefreshToken', refreshToken);
  setLoginProcessed();
  reload();
};

export default kakaoLogin;
