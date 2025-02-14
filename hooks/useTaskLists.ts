import { useQueries, useQueryClient } from '@tanstack/react-query';

import { getTaskList } from '@/service/taskList.api';
import useGroupStore from '@/stores/useGroup.store';
import useDate from './useDate';
import { useEffect } from 'react';

/**
 * 특정 팀에 속한 모든 할 일 목록을 관리하기 위한 커스텀 훅입니다.
 *
 * @property taskList 할 일 목록 상세 리스트
 * @property isPending 할 일 목록 리스트 요청 중 여부
 * @property error 요청 중 발생한 에러
 * @property refetchById 특정 할 일 목록 리페칭
 * @property removeById 특정 할 일 목록 캐싱 삭제
 * @property refetchAll 모든 할 일 목록 리페칭
 */
export default function useTaskLists() {
  const queryClient = useQueryClient();
  const { date } = useDate();
  const { taskLists, setTaskLists, clearStore } = useGroupStore();

  const { data, isPending, error } = useQueries({
    queries:
      taskLists?.map(({ id, groupId }) => ({
        queryKey: ['taskList', id],
        queryFn: () => getTaskList({ groupId, id, date }),
        staleTime: 1000 * 60 * 5,
      })) || [],
    combine: (results) => {
      return {
        data: results
          .map((result) => result.data)
          .filter((el) => el !== null && el !== undefined),
        isPending: results.some((result) => result.isPending),
        error: results.find((result) => result.error)?.error,
      };
    },
  });

  const refetchById = async (id: number) =>
    await queryClient.refetchQueries({ queryKey: ['taskList', id] });

  const refetchAll = async () =>
    await queryClient.refetchQueries({ queryKey: ['taskList'] });

  const removeById = (id: number) => {
    const next = taskLists?.filter((taskList) => taskList.id !== id);
    if (next) {
      setTaskLists(next.length !== 0 ? next : null);
      queryClient.removeQueries({ queryKey: ['taskList', id] });
    }
  };

  const removeAll = () => {
    clearStore();
    queryClient.removeQueries({ queryKey: ['taskLists'] });
  };

  useEffect(() => {
    refetchAll();
  }, [date]);

  return {
    taskLists: data.length > 0 ? data : null,
    isPending: !!taskLists && isPending,
    error,
    refetchById,
    refetchAll,
    removeById,
    removeAll,
  };
}
