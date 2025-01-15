import { OauthProvider } from './oauth.type';
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
  provider: OauthProvider;
  state?: string;
  redirectUri?: string;
  token: string;
}

interface AuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export type {
  SignUpParams,
  SignInParams,
  SignInProviderParams,
  AuthResponse,
};
