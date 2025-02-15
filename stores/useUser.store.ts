import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { IMembership, IUserDetail } from '@/types/user.type';
import { IGroup } from '@/types/group.type';

interface IUserStore {
  token: string | null;
  user: IUserDetail | null;
  memberships: IMembership[] | null;
  groups: IGroup[] | null;
  setToken: (token?: string) => void;
  setUser: (user: IUserDetail | null) => void;
  setMemberships: (memberships: IMembership[] | null) => void;
  setGroups: (groups: IGroup[] | null) => void;
  clearStore: () => void;
}

/**
 * 사용자 정보, 멤버십, 그룹 및 인증 토큰과 관련된 상태를 관리합니다.
 *
 * @interface IUserStore
 * @property  token : 현재 인증 토큰. 없을 경우 `null`.
 * @property  user : 사용자 상세 정보. 없을 경우 `null`.
 * @property  memberships : 사용자의 멤버십 배열. 없을 경우 `null`.
 * @property  groups : 멤버십에서 파생된 그룹 배열. 없을 경우 `null`.
 * @property  setToken : `localStorage`의 `accessToken` 읽어와 `token`을 설정하는 함수.
 * @property  setUser : 사용자 정보를 설정하는 함수.
 * @property  setMemberships : 사용자 멤버십 데이터를 설정하는 함수.
 * @property  setGroups : 사용자 그룹 데이터를 설정하는 함수.
 * @property  clearStore : 사용자 데이터와 토큰을 초기화하고 `localStorage`에서 토큰 데이터를 제거하는 함수.
 */
const useUserStore = create(
  persist<IUserStore>(
    (set) => ({
      token: null,
      user: null,
      memberships: null,
      groups: null,
      setToken: (token?: string) =>
        set({
          token:
            token !== undefined ? token : localStorage.getItem('accessToken'),
        }),
      setUser: (user) => set({ user }),
      setMemberships: (memberships) => set({ memberships }),
      setGroups: (groups) => set({ groups }),
      clearStore: () => {
        set({ token: null, user: null, memberships: null, groups: null });
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      },
    }),
    {
      name: 'user-store',
      onRehydrateStorage: () => (state) => {
        // 재수화가 완료되면 토큰을 강제로 업데이트합니다.
        state?.setToken();
      },
    },
  ),
);

export default useUserStore;
