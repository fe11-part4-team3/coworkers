import { getTaskList } from '@/service/taskList.api';
import useGroupStore from '@/stores/useGroup.store';
import { ITask } from '@/types/task.type';
import { useQueries, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

export interface IParsedTasks {
  length: number;
  todo: ITask[];
  done: ITask[];
}

export default function useTaskLists() {
  const queryClient = useQueryClient();
  const { taskLists, setTaskLists } = useGroupStore();

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

  const parseTasks = useCallback((tasks: ITask[]) => {
    const prasedTasks: IParsedTasks = {
      length: 0,
      todo: [],
      done: [],
    };
    tasks.forEach((task) => {
      if (task.deletedAt) return;
      if (task.doneAt) prasedTasks.done.push(task);
      else prasedTasks.todo.push(task);
      prasedTasks.length++;
    });
    return prasedTasks;
  }, []);

  const refetchById = async (id: number) =>
    await queryClient.refetchQueries({ queryKey: ['taskList', id] });

  const removeById = (id: number) => {
    const next = taskLists?.filter((taskList) => taskList.id !== id);
    if (next) {
      setTaskLists(next.length !== 0 ? next : null);
      queryClient.removeQueries({ queryKey: ['taskList', id] });
    }
  };

  const refetchAll = async () =>
    await queryClient.refetchQueries({ queryKey: ['taskList'] });

  return {
    taskLists: data.length > 0 ? data : null,
    isPending: !!taskLists && isPending,
    error,
    parseTasks,
    refetchById,
    removeById,
    refetchAll,
  };
}
