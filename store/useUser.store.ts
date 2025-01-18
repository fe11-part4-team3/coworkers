import { IUserDetail } from '@/types/user.type';
import { create } from 'zustand';

type UserStore = {
  user: IUserDetail | null; // 사용자 정보
  setUser: (user: IUserDetail) => void; // 사용자 정보 설정
  clearUser: () => void; // 사용자 정보 초기화
};

/**
 * 사용자 정보 상태 관리 훅
 * @returns 사용자 정보 상태
 * @see
 * - 사용자 정보 조회: user
 * - 사용자 정보 설정: setUser
 * - 사용자 정보 상태 초기화: clearUser
 * @example
 * const { user, setUser, clearUser } = useUserStore();
 */
const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
