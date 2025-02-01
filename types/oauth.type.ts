interface CreateOauthAppsParams {
  appSecret?: string;
  appKey: string;
  provider: string;
}

interface CreateOauthAppsResponse {
  createdAt: string;
  updatedAt: string;
  appSecret: string | null;
  appkey: string;
  provider: string;
  teamId: string;
  id: number;
}

export type { CreateOauthAppsParams, CreateOauthAppsResponse };
