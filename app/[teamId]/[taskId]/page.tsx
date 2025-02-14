'use client';

import { subDays, addDays } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import classNames from 'classnames';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import TaskDetail from '@/components/TaskDetail/TaskDetail';
import TaskCard from '@/components/TaskCard/TaskCard';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import { getTaskList } from '@/service/taskList.api';
import { updateTask, deleteTask } from '@/service/task.api';
import { UpdateTaskBodyParams } from '@/types/task.type';
import {
  getTaskComment,
  createTaskComment,
  updateTaskComment,
  deleteTaskComment,
} from '@/service/comment.api';

export default function TaskListPage() {
  const [detailTaskId, setDetailTaskId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const pathName = usePathname();
  const groupId = Number(pathName.split('/')[1]);
  const taskListId = Number(pathName.split('/')[2]);

  const { taskLists } = useGroup(groupId);

  const queryClient = useQueryClient();

  const fetchGetTaskList = useQuery({
    queryKey: [
      'getTaskList',
      { groupId, taskListId, date: date?.toDateString() },
    ],
    queryFn: () =>
      getTaskList({ groupId, id: taskListId, date: date?.toDateString() }),
  });

  const fetchUpdateTask = useMutation({
    mutationFn: ({
      taskId,
      body,
    }: {
      taskId: number;
      body: UpdateTaskBodyParams;
    }) => updateTask({ groupId, taskListId, taskId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getTaskList',
          { groupId, taskListId, date: date?.toDateString() },
        ],
      });
    },
    onError: () => console.error('할 일 수정 실패'),
  });

  const fetchDeleteTask = useMutation({
    mutationFn: (taskId: number) => deleteTask({ groupId, taskListId, taskId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          'getTaskList',
          { groupId, taskListId, date: date?.toDateString() },
        ],
      });
    },
    onError: () => console.error('할 일 삭제 실패'),
  });

  const fetchGetTaskComment = useMutation({
    mutationFn: (taskId: number) => getTaskComment({ taskId }),
    onError: () => console.error('댓글 불러오기 실패'),
  });

  const fetchCreateTaskComment = useMutation({
    mutationFn: ({ taskId, content }: { taskId: number; content: string }) =>
      createTaskComment({ taskId, content }),
    onError: () => console.error('댓글 작성 실패'),
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
  });

  const fetchUpdateTaskComment = useMutation({
    mutationFn: ({
      taskId,
      commentId,
      content,
    }: {
      taskId: number;
      commentId: number;
      content: string;
    }) => updateTaskComment({ taskId, commentId, content }),
    onError: () => console.error('댓글 수정 실패'),
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
  });

  const fetchDeleteTaskComment = useMutation({
    mutationFn: ({
      taskId,
      commentId,
    }: {
      taskId: number;
      commentId: number;
    }) => deleteTaskComment({ taskId, commentId }),
    onError: () => console.error('댓글 삭제 실패'),
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
  });

  const handleDeleteTask = (taskId: number) => {
    if (confirm('할 일을 삭제하시겠습니까?')) {
      fetchDeleteTask.mutate(taskId);
    }
  };

  const handlePrevDate = () => {
    if (!date) return;
    setDate(subDays(date, 1));
  };

  const handleNextDate = () => {
    if (!date) return;
    setDate(addDays(date, 1));
  };

  dayjs.locale('ko');
  const formattedDate = dayjs(date).format('M월 D일 (ddd)');

  const toggleDetailTask = (taskId: number) => {
    setDetailTaskId((prev) => (prev === taskId ? null : taskId));
    fetchGetTaskComment.mutate(taskId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!date) return setDate(new Date());
    fetchGetTaskList.refetch();
  }, [date]);

  return (
    <>
      <Container className="relative h-screen">
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="relative mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div
              className="flex items-center gap-pr-4 text-b-secondary"
              onClick={() => setDetailTaskId(null)}
              ref={ref}
            >
              <PrevButtonIcon
                className="cursor-pointer"
                onClick={handlePrevDate}
              />
              <NextButtonIcon
                className="cursor-pointer"
                onClick={handleNextDate}
              />
              <CalendarButtonIcon
                className="ml-pr-8 cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              />
            </div>
          </div>
        </div>
        <ul className="mt-pr-24 flex gap-pr-12 text-16m">
          {taskLists?.map((taskList) => (
            <Link href={`/${groupId}/${taskList.id}`} key={taskList.id}>
              <li
                className={`cursor-pointer ${taskList.id === taskListId ? 'text-t-primary' : 'text-t-default'}`}
              >
                {taskList.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16">
          {fetchGetTaskList.data?.tasks.map((task) => (
            <div key={task.id}>
              <div onClick={() => toggleDetailTask(task.id)}>
                <TaskCard
                  type="taskList"
                  taskData={task}
                  updateTask={fetchUpdateTask.mutate}
                />
              </div>
              <div>
                <TaskDetail
                  isOpen={detailTaskId === task.id}
                  setIsOpen={() => toggleDetailTask(task.id)}
                  value={task}
                  commentData={fetchGetTaskComment.data}
                  postComment={fetchCreateTaskComment.mutate}
                  deleteTask={handleDeleteTask}
                  updateTask={fetchUpdateTask.mutate}
                  deleteComment={fetchDeleteTaskComment.mutate}
                  updateComment={fetchUpdateTaskComment.mutate}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-pr-48 left-1/2 flex w-full max-w-screen-xl -translate-x-1/2 items-end justify-end tamo:bottom-pr-24 tamo:pr-pr-24">
          <Buttons
            text="할 일 추가"
            icon={<PlusIcon width={16} height={16} />}
            onClick={() => {}}
            className={classNames('w-pr-125', detailTaskId && 'hidden')}
            rounded
          />
        </div>
      </Container>
    </>
  );
}
