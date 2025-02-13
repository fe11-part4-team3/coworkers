import { getTaskList } from '@/service/taskList.api';
import useGroupStore from '@/stores/useGroup.store';
import { useQueries, useQueryClient } from '@tanstack/react-query';

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
  const { taskLists, setTaskLists, clearStore } = useGroupStore();

  const queries = useQueries({
    queries:
      taskLists?.map(({ id, groupId }) => ({
        queryKey: ['taskList', id],
        queryFn: () =>
          getTaskList({ groupId, id, date: new Date().toISOString() }),
        initialData: null,
      })) || [],
  });

  const data = queries
    .map((query) => query.data)
    .filter((el) => el !== null && el !== undefined);

  const isPending = queries.some((query) => query.isPending);

  const error = queries.find((query) => query.error)?.error;

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
