import { getTaskList } from '@/service/taskList.api';
import { ITaskListSummary } from '@/types/group.type';
import { useQueries, useQueryClient } from '@tanstack/react-query';

export default function useTaskLists(taskLists: ITaskListSummary[] | null) {
  const queryClient = useQueryClient();
  const queries = useQueries({
    queries:
      taskLists?.map(({ id, groupId }) => ({
        queryKey: ['taskList', id],
        queryFn: () => getTaskList({ groupId, id }),
      })) || [],
  });

  const data = queries
    .map((query) => query.data)
    .filter((el) => el !== undefined);
  const isPending = queries.some((query) => query.isPending);
  const error = queries.find((query) => query.error)?.error;

  const refetchById = async (id: number) =>
    await queryClient.refetchQueries({ queryKey: ['taskList', id] });

  const refetchAll = async () =>
    await queryClient.refetchQueries({ queryKey: ['taskList'] });

  return {
    queries,
    data,
    isPending: !!taskLists && isPending,
    error,
    refetchById,
    refetchAll,
  };
}
