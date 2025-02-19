import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { ITaskList } from '@/types/taskList.type';
import TaskCard from '@/components/TaskCard/TaskCard';
import { Drawer, DrawerTrigger } from '@/components/ui/drawer';
import { ITask } from '@/types/task.type';
import Empty from '@/components/Empty/Empty';
import { useSnackbar } from '@/contexts/SnackBar.context';
import { updateTask } from '@/service/task.api';
import useTaskLists from '@/hooks/useTaskLists';

import TaskDetail from './TaskDetail';

interface TaskListWrapper {
  taskList: ITaskList | null;
}

export default function TaskListWrapper({ taskList }: TaskListWrapper) {
  const { refetchById } = useTaskLists();
  const [task, setTask] = useState<ITask | null>(null);
  const { showSnackbar } = useSnackbar();

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (task: ITask) =>
      updateTask({
        groupId: taskList?.groupId as number,
        taskListId: taskList?.id as number,
        taskId: task.id,
        body: {
          name: task.name,
          description: task.description || '',
          done: !task.doneAt,
        },
      }),
    onSuccess: (response) => {
      refetchById(taskList?.id as number);
      showSnackbar(
        response.doneAt
          ? '할 일을 완료했습니다.'
          : '할 일 완료를 취소했습니다.',
      );
    },
    onError: () => showSnackbar('할 일을 수정 할 수 없습니다.', 'error'),
  });

  const handleCloseDetail = () => setTask(null);

  if (!taskList) return null;

  return (
    <>
      {taskList.tasks.length > 0 ? (
        <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16">
          <Drawer direction="right">
            {taskList.tasks.map((task) => (
              <DrawerTrigger asChild key={task.id}>
                {/* div 박스가 없으면 trigger가 동작하지 않습니다. */}
                <div>
                  <TaskCard
                    type="taskList"
                    task={task}
                    onClick={() => setTask(task)}
                    onToggle={() => updateTaskMutate(task)}
                  />
                </div>
              </DrawerTrigger>
            ))}
            {task && (
              <TaskDetail
                taskListId={taskList.id}
                task={task}
                onClose={handleCloseDetail}
              />
            )}
          </Drawer>
        </div>
      ) : (
        <Empty className="mt-pr-80">
          <Empty.TextWrapper>
            <Empty.Text text="생성된 할 일이 없습니다." />
          </Empty.TextWrapper>
        </Empty>
      )}
    </>
  );
}
