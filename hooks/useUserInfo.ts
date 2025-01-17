import { useEffect } from 'react';

import { getUser } from '@/service/user.api';
import useUserStore from '@/store/useUser.store';
import { useAuth } from '@/hooks/useAuth';

/**
 * 사용자 정보를 불러오는 커스텀 훅
 * @see
 * - 사용자 정보 조회: user
 * - 사용자 정보 설정: setUser
 * @example
 * useUserInfo();
 */
const useUserInfo = () => {
  const { isAuthenticated, accessToken } = useAuth();
  const { setUser } = useUserStore();

  useEffect(() => {
    // 사용자 정보를 불러오는 비동기 함수
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUser(accessToken);
        if (userInfo) {
          setUser(userInfo);
        }
      } catch (error) {
        console.log(
          '유저 정보를 불러올 수 없습니다.',
          error,
        );
      }
    };

    // 인증된 사용자일 때 사용자 정보를 불러옴
    if (isAuthenticated) {
      fetchUserInfo();
    }
  }, [isAuthenticated, accessToken, setUser]);
};

export default useUserInfo;
