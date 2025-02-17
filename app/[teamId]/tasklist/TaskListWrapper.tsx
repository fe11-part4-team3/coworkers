import { format } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import KebabDropDown from '@/components/KebabDropDown';
import Profile from '@/components/Profile/Profile';
import TaskCard from '@/components/TaskCard/TaskCard';
import {
  CustomDrawerContent,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ITask, UpdateTaskBodyParams } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import IconLabel from '@/components/IconLabel';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useUser from '@/hooks/useUser';
import { deleteTask, updateTask } from '@/service/task.api';
import useTaskLists from '@/hooks/useTaskLists';
import useGroup from '@/hooks/useGroup';

import TaskCommentWrapper from './TaskCommentWrapper';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import TextareaField from '@/components/InputField/TextareaField';
import Buttons from '@/components/Buttons';

const REPEAT = {
  ONCE: '반복 없음',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

interface TaskListWrapper {
  taskList: ITaskList | null;
}

export default function TaskListWrapper({ taskList }: TaskListWrapper) {
  const { refetchById } = useTaskLists();
  const [task, setTask] = useState<ITask | null>(null);
  const { showSnackbar } = useSnackbar();

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (params: { taskId: number; body: UpdateTaskBodyParams }) =>
      updateTask({
        groupId: taskList?.groupId as number,
        taskListId: taskList?.id as number,
        ...params,
      }),
    onSuccess: () => {
      refetchById(taskList?.id as number);
      showSnackbar('완료 여부를 변경했습니다.');
    },
    onError: () => showSnackbar('완료 여부를 변경할 수 없습니다.', 'error'),
  });

  const handleCloseDetail = () => setTask(null);

  if (!taskList) return null;

  return (
    <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16">
      <Drawer direction="right">
        {taskList.tasks.map((task) => (
          <DrawerTrigger asChild key={task.id}>
            {/* div 박스가 없으면 trigger가 동작하지 않습니다. */}
            <div>
              <TaskCard
                type="taskList"
                taskData={task}
                setTask={setTask}
                updateTask={updateTaskMutate}
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
  );
}

interface TaskDetailProps {
  taskListId: number;
  task: ITask;
  onClose: () => void;
}

function TaskDetail({ task, taskListId, onClose }: TaskDetailProps) {
  const { user } = useUser();
  const { groupId } = useGroup();
  const { refetchById } = useTaskLists();
  const { showSnackbar } = useSnackbar();
  const [isEdit, setIsEdit] = useState(false);
  const { formData, handleInputChange, errorMessage } = useForm({
    name: task.name,
    content: task.description || '',
  });

  const updatedAt = format(new Date(task.updatedAt), 'yyyy.MM.dd');
  const date = format(new Date(task.date), 'yyyy년 M월 dd일');
  const time = format(new Date(task.date), '오후 h:mm');

  const { mutate: updateTaskMutate } = useMutation({
    mutationFn: (params: { taskId: number; body: UpdateTaskBodyParams }) =>
      updateTask({
        groupId: groupId,
        taskListId: taskListId,
        ...params,
      }),
    onSuccess: () => {
      setIsEdit(false);
      refetchById(taskListId);
      showSnackbar('완료 여부를 변경했습니다.');
    },
    onError: () => showSnackbar('완료 여부를 변경할 수 없습니다.', 'error'),
  });

  const { mutate: deleteTaskMutate } = useMutation({
    mutationFn: () => deleteTask({ groupId, taskListId, taskId: task.id }),
    onSuccess: () => {
      refetchById(taskListId);
      showSnackbar('할 일을 삭제했습니다.');
      onClose();
    },
    onError: () => showSnackbar('할 일을 삭제할 수 없습니다.', 'error'),
  });

  const handleEditTask = () => {
    updateTaskMutate({
      taskId: task.id,
      body: {
        name: formData.name,
        description: formData.content,
        done: !!task.doneAt,
      },
    });
  };

  useEffect(() => {
    setIsEdit(false);
  }, [task]);

  return (
    <CustomDrawerContent className="inset-y-0 right-0 w-pr-780 gap-pr-16 p-pr-40">
      <DrawerClose asChild style={{ position: 'static' }}>
        <button className="absolute right-pr-25 top-pr-16 text-gray-500">
          <Image
            width={20}
            height={20}
            src="/images/icon-close.svg"
            alt="닫기 버튼"
          />
        </button>
      </DrawerClose>

      {/* SECTION - Header */}
      <DrawerHeader className="w-full gap-pr-16 p-0">
        <div className="flex items-center justify-between">
          <DrawerTitle className="grow">
            {isEdit ? (
              <InputField
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                errorMessage={errorMessage.name}
              />
            ) : (
              <span className="text-20b text-t-primary">{formData.name}</span>
            )}
          </DrawerTitle>
          {user?.id === task.writer?.id && !isEdit && (
            <KebabDropDown
              onEdit={() => setIsEdit(true)}
              onDelete={deleteTaskMutate}
            />
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-pr-12">
            <Profile
              variant="member"
              image={task.writer?.image}
              profileSize={32}
            />
            <span className="text-14m text-t-primary">
              {task.writer?.nickname}
            </span>
          </div>
          <span className="text-14 text-t-secondary">{updatedAt}</span>
        </div>
        <div className="flex items-center text-14">
          <IconLabel text={date} type="calendar" hasBar />
          <IconLabel text={time} type="time" hasBar />
          <IconLabel text={REPEAT[task.frequency]} type="repeat" />
        </div>
      </DrawerHeader>

      {/* SECTION - Description */}
      <div className="min-h-pr-200">
        <DrawerDescription>
          {!isEdit && (
            <span className="text-14 text-t-primary">{formData.content}</span>
          )}
        </DrawerDescription>
        {isEdit && (
          <div>
            <TextareaField
              height="min-h-pr-200"
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
            <div className="mt-pr-12 flex items-center justify-end gap-pr-8">
              <button
                className="w-pr-48 text-14sb text-t-default"
                onClick={() => setIsEdit(false)}
              >
                취소
              </button>

              <Buttons
                disabled={false}
                text="수정하기"
                border="primary"
                onClick={handleEditTask}
                backgroundColor="none"
                textColor="primary"
                size="S"
                className="w-pr-74"
              />
            </div>
          </div>
        )}
      </div>

      {/* SECTION - Comment */}
      <TaskCommentWrapper taskId={task.id} />

      <DrawerFooter></DrawerFooter>
    </CustomDrawerContent>
  );
}
