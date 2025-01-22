import { getGroupList } from '@/service/user.api';
import useGroupStore from '@/stores/useGroup.store';
import useUserStore from '@/stores/useUser.store';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const useGroupList = () => {
  const { currentGroup, setCurrentGroup } = useGroupStore((state) => state);
  const { user } = useUserStore();
  const { teamId } = useParams();
  const groupId = teamId ? Number(teamId) : null;
  const { data: groups, isPending } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroupList,
    enabled: !!user,
  });

  useEffect(() => {
    if (!groupId || !groups || isPending) {
      setCurrentGroup(null);
      return;
    }

    const flag = groups.some((group) => {
      if (group.id === groupId) {
        setCurrentGroup(group);
        return true;
      }
      return false;
    });

    if (!flag) setCurrentGroup(null);
  }, [groupId, groups, isPending]);

  return { groups: groups || null, isPending, currentGroup };
};

export default useGroupList;
