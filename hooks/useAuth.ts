import useUserStore from '@/stores/useUser.store';
import { useState, useEffect } from 'react';

/**
 * 사용자 인증 상태를 관리하는 커스텀 훅
 * @returns 사용자 인증 상태
 * @see
 * - 인증 여부: isAuthenticated
 * - 엑세스 토큰: accessToken
 * - 엑세스 토큰 설정: setAccessToken
 * @example
 * const { isAuthenticated, accessToken, setAccessToken, clearToken } = useAuth();
 */
export const useAuth = () => {
  // 엑세스 토큰 상태
  const [accessToken, setAccessTokenState] = useState<string | null>(null);
  // 사용자 인
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // accessToken 상태를 업데이트하면서 localStorage와 동기화
  const setAccessToken = (token: string | null) => {
    if (token) {
      localStorage.setItem('accessToken', token);
    } else {
      localStorage.removeItem('accessToken');
    }
    setAccessTokenState(token);
  };

  // clearToken 함수 정의
  const clearToken = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAccessTokenState(null);
  };

  // 클라이언트 렌더링 후 accessToken 초기화
  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // 브라우저 환경에서만 localStorage 사용
    setAccessTokenState(token);
    setIsAuthenticated(!!token); // accessToken이 있으면 true로 설정
  }, []);

  // accessToken 변경 시 isAuthenticated 업데이트
  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  return {
    isAuthenticated,
    accessToken,
    setAccessToken,
    clearToken,
  };
};
