import { getTaskList } from '@/service/taskList.api';
import { ITaskListSummary } from '@/types/group.type';
import { useQueries } from '@tanstack/react-query';

export default function useTaskLists(taskLists: ITaskListSummary[] | null) {
  const data = useQueries({
    queries: getQueries(taskLists),
  });

  return { data };
}

const getQueries = (taskLists: ITaskListSummary[] | null) => {
  if (!taskLists) return [];
  return taskLists.map(({ id, groupId }) => ({
    queryKey: ['taskList', id],
    queryFn: () => getTaskList({ groupId, id }),
  }));
};
