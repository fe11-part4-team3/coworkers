import { format } from 'date-fns';
import Image from 'next/image';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import { useMutation, useQuery } from '@tanstack/react-query';

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
import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import IconLabel from '@/components/IconLabel';
import IconEnter from '@/public/images/icon-enter.svg';
import {
  createTaskComment,
  deleteTaskComment,
  getTaskComment,
  updateTaskComment,
} from '@/service/comment.api';
import Comment from '@/components/Comment/Comment';
import useForm from '@/hooks/useForm';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useUser from '@/hooks/useUser';
import { updateTask } from '@/service/task.api';
import useTaskLists from '@/hooks/useTaskLists';

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
    mutationFn: (params: {
      taskId: number;
      body: { name: string; description: string; done: boolean };
    }) =>
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
        {task && <TaskDetail task={task} />}
      </Drawer>
    </div>
  );
}

function TaskDetail({ task }: { task: ITask }) {
  const { user } = useUser();
  const { formData, handleInputChange, errorMessage, resetForm } = useForm({
    content: '',
  });
  const { showSnackbar } = useSnackbar();
  const commentValid = formData.content.length > 0 && !errorMessage.content;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: comments, refetch: refetchComment } = useQuery({
    queryKey: ['comments', task.id],
    queryFn: () => getTaskComment({ taskId: task.id }),
    enabled: !!task,
  });

  const sortedComments = comments?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const { mutate: createTaskCommentMutate } = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      createTaskComment({ taskId: task.id, content }),
    onSuccess: () => {
      refetchComment();
      resetForm({ content: '' });
      showSnackbar('댓글을 작성했습니다.');
    },
    onError: () => showSnackbar('댓글을 작성할 수 없습니다.', 'error'),
  });

  const { mutate: updateTaskCommentMutate } = useMutation({
    mutationFn: updateTaskComment,
    onSuccess: () => {
      refetchComment();
      showSnackbar('댓글이 수정되었습니다.');
    },
    onError: () => showSnackbar('댓글을 수정할 수 없습니다.', 'error'),
  });

  const { mutate: deleteTaskCommentMutate } = useMutation({
    mutationFn: (id: number) =>
      deleteTaskComment({ taskId: task.id, commentId: id }),
    onSuccess: () => {
      refetchComment();
      showSnackbar('댓글이 삭제되었습니다.');
    },
    onError: () => showSnackbar('댓글을 삭제할 수 없습니다.', 'error'),
  });

  const updatedAt = format(new Date(task.updatedAt), 'yyyy.MM.dd');
  const date = format(new Date(task.date), 'yyyy년 M월 dd일');
  const time = format(new Date(task.date), '오후 h:mm');

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 64)}px`;
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea();
    handleInputChange(event);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTaskCommentMutate(formData);
  };

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
          <DrawerTitle className="text-20b text-t-primary">
            {task.name}
          </DrawerTitle>
          {user?.id === task.writer?.id && (
            <KebabDropDown onEdit={() => {}} onDelete={() => {}} />
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
          <span className="text-14 text-t-primary">{task.description}</span>
        </DrawerDescription>
      </div>

      {/* SECTION - Comment */}
      <div>
        <form
          className="flex items-center border border-x-0 border-input py-pr-12"
          onSubmit={handleSubmit}
        >
          <textarea
            className="grow resize-none bg-transparent text-14 outline-none placeholder:text-t-default"
            ref={textareaRef}
            name="content"
            rows={1}
            value={formData.content}
            onChange={handleInput}
            placeholder="댓글을 달아주세요"
          />
          <button
            type="submit"
            className={classNames([
              'flex items-center justify-center',
              'size-pr-24 shrink-0 rounded-full',
              commentValid ? 'bg-brand-primary' : 'bg-t-default',
            ])}
            disabled={!commentValid}
          >
            <IconEnter />
          </button>
        </form>

        <div>
          {sortedComments?.map((comment) => (
            <Comment
              key={comment.id}
              type="task"
              taskId={task.id}
              commentData={comment}
              handleDeleteClick={deleteTaskCommentMutate}
              handleUpdateSubmit={updateTaskCommentMutate}
            />
          ))}
        </div>
      </div>

      <DrawerFooter></DrawerFooter>
    </CustomDrawerContent>
  );
}
