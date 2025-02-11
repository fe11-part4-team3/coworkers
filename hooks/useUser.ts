import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

import useUserStore from '@/stores/useUser.store';
import { getUser } from '@/service/user.api';

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
    setUser,
    setMemberships,
    setGroups,
    clearStore,
  } = useUserStore((state) => state);

  /**
   * zustand에 저장되어 있는 user와 memberships를 결합하여
   * React Query의 initialData로 제공.
   * getUser API가 반환하는 데이터의 구조(예: { …user, memberships })와 동일해야 함.
   */
  const initialData = token && user ? { ...user, memberships } : undefined;
  const shouldFetch = !!token && !user;

  const { data, isPending, error, refetch } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: shouldFetch,
    initialData,
    initialDataUpdatedAt: initialData ? Date.now() : undefined,
    // 데이터가 5분간은 fresh한 상태로 간주
    staleTime: 5 * 60 * 1000,
    // 컴포넌트 마운트나 윈도우 포커스 시 추가 refetch 방지
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const clear = () => clearStore();

  const reload = useCallback(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (!!token && !user) {
      reload();
    }
  }, [reload, token, user]);

  useEffect(() => {
    if (!token) return;
    setUser(data || null);
    if (data?.memberships && data.memberships.length > 0) {
      setMemberships(data.memberships);
      setGroups(data.memberships.map((membership) => membership.group));
    } else {
      setMemberships(null);
      setGroups(null);
    }
  }, [data, token, setUser, setMemberships, setGroups]);

  useEffect(() => {
    if (!required) return;
    if (!token || (!data && !isPending)) {
      router.push('/');
    }
  }, [required, token, data, isPending, router]);

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
