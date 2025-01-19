import { getUser } from '@/service/user.api';
import { IUserDetail } from '@/types/user.type';
import { create } from 'zustand';

interface AuthState {
  user: IUserDetail | null;
  accessToken: string | null;
  initializeUserData: () => Promise<void>;
  setAccessToken: (token: string) => void;
  setUser: (user: IUserDetail) => void;
}

/**
 * 사용자 정보 상태 관리 훅
 * @returns 사용자 정보 상태
 * @see
 * - 사용자 정보: user
 * - 엑세스 토큰: accessToken
 * - 사용자 정보 초기화: initializeUserData
 * - 사용자 정보 설정: setUser
 * - 엑세스 토큰 설정: setAccessToken
 * @example
 * const { isAuthenticated } = useAuth();
 * const { user, initializeUserData } = useUserStore();
 *
 * useEffect(() => {
 *   initializeUserData();
 * }, [initializeUserData]);
 *
 * if (isAuthenticated && !user) {
 *   return <div>사용자 정보를 불러오는 중입니다...</div>;
 * }
 */

const useUserStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  setAccessToken: (token) => set({ accessToken: token }),
  setUser: (user) => set({ user }),
  initializeUserData: async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) return;

    try {
      const response = await getUser();
      if (!response) throw new Error('유저 데이터를 불러오지못했습니다.');

      set({ user: response, accessToken: token });
    } catch (error) {
      console.error('유저 초기 데이터가 없습니다.:', error);
      set({ user: null });
    }
  },
}));

export default useUserStore;
