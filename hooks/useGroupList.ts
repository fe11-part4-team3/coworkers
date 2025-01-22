import { getGroupList } from '@/service/user.api';
import useGroupStore from '@/stores/useGroup.store';
import useUserStore from '@/stores/useUser.store';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

/**
 * - `currentGroup` : 현재 경로의 teamId 기준 속해 있는 그룹 데이터
 * - `groups` : `getGroupList`의 응답 데이터
 * - `isPending` : 로딩 여부
 */
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
