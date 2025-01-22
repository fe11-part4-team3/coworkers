import { IMembership, IUserDetail } from '@/types/user.type';
import { create } from 'zustand';
import { getUser } from '@/service/user.api';
import { persist } from 'zustand/middleware';
import { IGroup } from '@/types/group.type';

interface IUserStore {
  user: IUserDetail | null;
  memberships: IMembership[] | null;
  groups: IGroup[] | null;
  setUser: (user: IUserDetail | null) => void;
  setMemberships: (memberships: IMembership[] | null) => void;
  setGroups: (groups: IGroup[] | null) => void;
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
      memberships: null,
      groups: null,
      setUser: (user) => set({ user }),
      setMemberships: (memberships) => set({ memberships }),
      setGroups: (groups) => set({ groups }),
    }),
    {
      name: 'user-store',
    },
  ),
);

export default useUserStore;
