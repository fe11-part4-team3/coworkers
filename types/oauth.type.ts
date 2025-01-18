enum OauthProvider {
  GOOGLE,
  KAKAO,
}

interface CreateOauthAppsParams {
  appSecret?: string;
  appKey: string;
  provider: OauthProvider;
}

interface CreateOauthAppsResponse {
  createdAt: string;
  updatedAt: string;
  appSecret: string | null;
  appkey: string;
  provider: OauthProvider;
  teamId: string;
  id: number;
}

export { OauthProvider };
export type { CreateOauthAppsParams, CreateOauthAppsResponse };
