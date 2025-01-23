import { getUser } from '@/service/user.api';
import useUserStore from '@/stores/useUser.store';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

/**
 * 유저 관련 정보를 관리하기 위한 커스텀 훅입니다.
 *
 * @example
 * ```ts
 * // 인증이 필요한 페이지
 * const { user, isPending } = useUser(true);
 *
 * // 인증이 필요하지 않은 페이지
 * const { reload } = useUser();
 * ```
 *
 * @param {boolean} required default = false
 * ```
 * 인증이 필요한 페이지에 로그인하지 않은
 * 사용자의 접속 시 `/`로 리다이렉트 합니다.
 * `true` : 인증 필요
 * `false` : 인증 불필요
 * ```
 *
 * @returns
 * - `isAuthenticated` : 사용자의 인증 여부
 * - `user` : 유저 상세 데이터
 * - `memberships` : 멤버십 목록 데이터
 * - `groups` : 그룹(팀) 목록 데이터
 * - `isPending` : 요청 및 리페칭 중
 * - `error` : 요청 중 발생한 에러
 * - `claer` : 인증 정보 초기화 함수. __로그아웃__
 * - `reload` : 갱신 함수. 데이터를 최신화함
 */
const useUser = (required?: boolean) => {
  const router = useRouter();
  const {
    token,
    user,
    memberships,
    groups,
    setToken,
    setUser,
    setMemberships,
    setGroups,
    clearStore,
  } = useUserStore((state) => state);
  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!token,
  });

  const clear = () => clearStore();

  const reload = useCallback(() => {
    setToken();
    if (token) refetch();
  }, [setToken, token]);

  const storeUser = useCallback(() => setUser(data || null), [data, setUser]);

  const storeMemberships = useCallback(() => {
    setMemberships(data?.memberships || null);
  }, [data, setMemberships]);

  const storeGroups = useCallback(() => {
    const memberships = data?.memberships || null;
    memberships && memberships.length > 0
      ? setGroups(memberships.map((membership) => membership.group))
      : setGroups(null);
  }, [data, setGroups]);

  useEffect(() => reload(), [reload]);

  useEffect(() => {
    if (!token) return;
    storeUser();
    storeMemberships();
    storeGroups();
  }, [data, token]);

  useEffect(() => {
    if (!required) return;
    if (!token || (!user && !isPending)) {
      router.push('/');
    }
  }, [required, token, user, isPending, router]);

  return {
    isAuthenticated: !!token,
    user,
    memberships,
    groups,
    isPending: !!token && isPending,
    error,
    clear,
    reload,
  };
};

export default useUser;
