'use client';

import axios, {
  AxiosError,
  AxiosRequestConfig,
} from 'axios';

import { useRouter } from 'next/router';
import { TokenResponse } from '@/types/auth.type';

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// 공개 엔드포인트 목록
const PUBLIC_ENDPOINTS = {
  post: [
    '/auth/signUp',
    '/auth/signIn',
    '/auth/refresh-token',
    '/auth/{provider}',
  ],
  get: [
    '/user/reset-password',
    '/articles',
    '/articles/*',
    '/articles/*/comments',
  ],
} as const;

/**
 * 특정 URL이 공개 엔드포인트인지 확인
 * @param url - 요청 URL
 * @param method - HTTP 메서드
 * @returns 공개 여부
 */
const isPublicEndpoint = (
  url?: string,
  method?: string,
): boolean => {
  if (!url || !method) return false;

  const upperMethod = method.toUpperCase();

  // POST 요청
  if (upperMethod === 'POST') {
    return PUBLIC_ENDPOINTS.post.includes(
      url as (typeof PUBLIC_ENDPOINTS.post)[number],
    );
  }

  // GET 요청 (와일드카드 패턴 포함)
  if (upperMethod === 'GET') {
    return PUBLIC_ENDPOINTS.get.some((pattern) => {
      if (pattern.includes('*')) {
        const regex = new RegExp(
          `^${pattern.replace('*', '[^/]+')}$`,
        );
        return regex.test(url);
      }
      return pattern === url;
    });
  }

  return false;
};

/**
 * 리프레시 토큰으로 새 액세스 토큰 요청
 * @returns 새 액세스 토큰 또는 null
 */
const refreshToken = async (): Promise<string | null> => {
  const router = useRouter();

  const storedToken = localStorage.getItem('refreshToken');
  if (!storedToken) {
    console.log('로그인 세션 만료');
    return null;
  }

  try {
    const response = await axios.post<TokenResponse>(
      `${BASE_URL}/auth/refresh-token`,
      {
        refreshToken: storedToken,
      },
    );
    const { accessToken } = response.data;

    if (!accessToken)
      throw new Error('잘못된 액세스 토큰 수신');

    localStorage.setItem('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    localStorage.clear();
    console.log('로그인 세션 만료');
    router.push('/login');
    return null;
  }
};

/**
 * 요청 인터셉터 설정: 토큰 헤더 추가
 */
instance.interceptors.request.use(
  (config) => {
    if (isPublicEndpoint(config.url, config.method))
      return config;

    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 응답 인터셉터 설정: 401 처리 및 토큰 갱신
 */
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest =
      error.config as AxiosRequestConfig & {
        _retry?: boolean;
      };

    if (!originalRequest || originalRequest._retry)
      return Promise.reject(error);

    if (
      error.response?.status === 401 &&
      !isPublicEndpoint(
        originalRequest.url,
        originalRequest.method,
      )
    ) {
      originalRequest._retry = true;
      const newToken = await refreshToken();

      if (newToken) {
        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newToken}`,
        };
        return instance(originalRequest);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;
