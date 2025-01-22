import { getUser } from '@/service/user.api';
import useUserStore from '@/stores/useUser.store';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

const useUser = () => {
  const { memberships, groups, setUser, setMemberships, setGroups } =
    useUserStore((state) => state);
  const {
    data: user,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    enabled: !!localStorage.getItem('accessToken'),
  });

  const storeUser = useCallback(() => {
    setUser(user || null);
  }, [user]);

  const storeMemberships = useCallback(() => {
    const memberships = user?.memberships || null;
    setMemberships(memberships);
  }, [user]);

  const storeGroups = useCallback(() => {
    const memberships = user?.memberships || null;

    if (memberships && memberships.length > 0) {
      setGroups(memberships.map((membership) => membership.group));
    } else {
      setGroups(null);
    }
  }, [user]);

  useEffect(() => {
    storeUser();
    storeMemberships();
    storeGroups();
  }, [user]);

  return {
    user: user || null,
    memberships,
    groups,
    isPending,
    error,
    refetch,
  };
};

export default useUser;
