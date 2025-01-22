import { getUser } from '@/service/user.api';
import useUserStore from '@/stores/useUser.store';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';

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

  const clear = useCallback(() => clearStore(), [clearStore]);

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
    storeUser();
    storeMemberships();
    storeGroups();
  }, [data]);

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
    isPending,
    error,
    clear,
    reload,
  };
};

export default useUser;
