import {
  SignUpParams,
  AuthResponse,
  SignInParams,
  SignInProviderParams,
} from '@/types/auth.type';
import instance from './axios';

const signUp = async ({
  email,
  nickname,
  password,
  passwordConfirmation,
}: SignUpParams): Promise<AuthResponse> => {
  const response = await instance.post('/auth/signUp', {
    email,
    nickname,
    password,
    passwordConfirmation,
  });
  return response.data;
};

const signIn = async (
  data: { email: string; password: string },
  setAccessToken: (token: string | null) => void,
): Promise<AuthResponse> => {
  try {
    const response = await instance.post('/auth/signIn', data);
    // 로그인 성공 시 토큰 저장
    const { accessToken, refreshToken } = response.data;

    // accessToken은 axios 인스턴스에 직접 저장
    setAccessToken(accessToken);

    // refreshToken은 여전히 localStorage에 직접 저장
    localStorage.setItem('refreshToken', refreshToken);

    return response.data;
  } catch (e) {
    console.error('로그인 실패:', e);
    throw e;
  }
};

/**
 * @param refreshToken 리프레시 토큰
 * @returns `accessToken` 엑세스 토큰
 */
const refreshAccessToken = async (refreshToken: string): Promise<string> => {
  const response = await instance.post('/auth/refresh-token', {
    refreshToken,
  });
  return response.data.accessToken;
};

/**
 * ### 간편 로그인
 * 가입되어있지 않을 경우엔 가입됩니다.
 *
 * **state**
 * ```
 * code를 얻을 때 사용하였던 state 값을 그대로 사용합니다.
 * ```
 * **redirectUri**
 * ```
 * Kakao 의 경우에는 필수입니다.
 * 인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
 * ```
 * **token**
 * ```
 * 간편 로그인 과정을 통해 발급받은 토큰입니다.
 * - Google 의 경우에는 Google Id 토큰(JWT) 입니다.
 * - Kakao 의 경우에는 인가 코드 입니다.
 * ```
 */
const signInProvider = async ({
  provider,
  state,
  redirectUri,
  token,
}: SignInProviderParams): Promise<AuthResponse> => {
  const path = `/auth/signIn/${provider}`;
  const response = await instance.post(path, {
    state,
    redirectUri,
    token,
  });
  return response.data;
};

export { signUp, signIn, refreshAccessToken, signInProvider };
