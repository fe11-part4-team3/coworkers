import { IUserDetail } from '@/types/user.type';
import { create } from 'zustand';
import { getUser } from '@/service/user.api';
import { persist } from 'zustand/middleware';

interface IUserStore {
  user: IUserDetail | null;
  setUser: (user: IUserDetail) => void;
  clearUser: () => void;
  initializeUserData: () => Promise<void>;
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

const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      user: null,
      setUser: (user: IUserDetail) => set({ user }),
      clearUser: () => set({ user: null }),
      initializeUserData: async () => {
        const token = localStorage.getItem('accessToken');
        if (!token) return;

        try {
          const response = await getUser();
          if (!response) throw new Error('유저 데이터를 불러오지 못했습니다.');

          set({ user: response });
        } catch (error) {
          console.error('유저 초기 데이터가 없습니다.:', error);
          set({ user: null });
        }
      },
    }),
    {
      name: 'user-store',
    },
  ),
);

export default useUserStore;
