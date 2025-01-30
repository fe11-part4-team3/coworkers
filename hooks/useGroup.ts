import { getGroup } from '@/service/group.api';
import useGroupStore from '@/stores/useGroup.store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

/**
 * getGroup으로 불러온 데이터를 관리합니다.
 *
 * @param {number | null} groupId 현재 경로의 그룹(팀) ID
 *
 * **사용법**
 * ```ts
 * const { teamId } = usePatams();
 * const { ... } = useGroup(teamId);
 * ```
 *
 * @returns
 * - `group` : 현재 위치한 그룹 데이터. `getGroup`의 반환값
 * - `members` : 그룹에 속한 멤버 목록 데이터. `group`에서 파싱
 * - `taskLists` : 그룹에 속한 할 일 목록 배열. `group`에서 파싱
 * - `isPending` : `getGroup` 요청 및 갱신 중
 * - `clear` : `group`과 `group`에서 파싱된 데이터를 `null`로 초기화
 * - `reload` : `getGroup` 강제 리페칭
 */
const useGroup = (groupId: number | null) => {
  const {
    group,
    members,
    taskLists,
    setGroup,
    setMembers,
    setTaskLists,
    clearStore,
  } = useGroupStore();
  const { data, isPending, refetch } = useQuery({
    queryKey: ['group'],
    queryFn: () => {
      return groupId ? getGroup({ id: groupId }) : null;
    },
  });

  const storeGroup = useCallback(() => {
    setGroup(data || null);
  }, [data, setGroup]);

  const storeMembers = useCallback(() => {
    data?.members && data.members.length > 0
      ? setMembers(data.members)
      : setMembers(null);
  }, [data, setMembers]);

  const storeTaskLists = useCallback(() => {
    data?.taskLists && data.taskLists.length > 0
      ? setTaskLists(data.taskLists)
      : setTaskLists(null);
  }, [data, setTaskLists]);

  const clear = () => clearStore();
  const reload = () => refetch();

  useEffect(() => {
    storeGroup();
    storeMembers();
    storeTaskLists();
  }, [data]);

  return {
    group,
    members,
    taskLists,
    isPending: !!groupId && isPending,
    clear,
    reload,
  };
};

export default useGroup;
