import { IUser } from './user.type';

interface SignUpParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface SignInParams {
  email: string;
  password: string;
}

interface SignInProviderParams {
  provider: string;
  state?: string;
  redirectUri?: string;
  token: string;
}

interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

interface TokenResponse {
  accessToken: string;
}

export type {
  SignUpParams,
  SignInParams,
  SignInProviderParams,
  AuthResponse,
  TokenResponse,
};
