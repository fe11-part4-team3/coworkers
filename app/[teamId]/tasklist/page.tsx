'use client';

import { useState, useEffect, useRef } from 'react';
import 'dayjs/locale/ko';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import TaskDetail from '@/components/TaskDetail/TaskDetail';
import TaskCard from '@/components/TaskCard/TaskCard';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import { updateTask, deleteTask } from '@/service/task.api';
import { UpdateTaskBodyParams } from '@/types/task.type';
import {
  getTaskComment,
  createTaskComment,
  updateTaskComment,
  deleteTaskComment,
} from '@/service/comment.api';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import useTaskLists from '@/hooks/useTaskLists';
import { ITaskList } from '@/types/taskList.type';
import createUrlString from '@/utils/createUrlString';
import useDate from '@/hooks/useDate';

export default function TaskListPage() {
  const { showSnackbar } = useSnackbar();
  const { openModal } = useModalStore();

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);
  const [detailTaskId, setDetailTaskId] = useState<number | null>(null);

  const { date, kstDate, prev, next } = useDate();
  const { groupId } = useGroup();
  const { taskLists, refetchById, refetchAll } = useTaskLists();
  const taskListId = Number(useSearchParams().get('id'));
  const [taskList, setTaskList] = useState<ITaskList | null>(null);

  const ref = useRef<HTMLDivElement>(null);

  const toggleDetailTask = (taskId: number) => {
    setDetailTaskId((prev) => (prev === taskId ? null : taskId));
    fetchGetTaskComment.mutate(taskId);
  };

  const fetchUpdateTask = useMutation({
    mutationFn: ({
      taskId,
      body,
    }: {
      taskId: number;
      body: UpdateTaskBodyParams;
    }) => updateTask({ groupId, taskListId, taskId, body }),
    onSuccess: () => {
      refetchById(taskListId);
      showSnackbar('할 일이 수정되었습니다.');
    },
    onError: () => showSnackbar('할 일 수정할 수 없습니다.', 'error'),
  });

  const fetchDeleteTask = useMutation({
    mutationFn: (taskId: number) => deleteTask({ groupId, taskListId, taskId }),
    onSuccess: () => {
      refetchById(taskListId);
      showSnackbar('할 일이 삭제되었습니다.');
    },
    onError: () => showSnackbar('할 일을 삭제할 수 없습니다.', 'error'),
  });

  const fetchGetTaskComment = useMutation({
    mutationFn: (taskId: number) => getTaskComment({ taskId }),
    onError: () => showSnackbar('댓글을 불러 올 수 없습니다.', 'error'),
  });

  const fetchCreateTaskComment = useMutation({
    mutationFn: ({ taskId, content }: { taskId: number; content: string }) =>
      createTaskComment({ taskId, content }),
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
    onError: () => showSnackbar('댓글을 작성할 수 없습니다.', 'error'),
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
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
    onError: () => showSnackbar('댓글을 수정할 수 없습니다.', 'error'),
  });

  const fetchDeleteTaskComment = useMutation({
    mutationFn: ({
      taskId,
      commentId,
    }: {
      taskId: number;
      commentId: number;
    }) => deleteTaskComment({ taskId, commentId }),
    onSuccess: (_, variables) => fetchGetTaskComment.mutate(variables.taskId),
    onError: () => showSnackbar('댓글을 삭제할 수 없습니다.', 'error'),
  });

  const handleDeleteTask = (taskId: number) => {
    if (confirm('할 일을 삭제하시겠습니까?')) {
      fetchDeleteTask.mutate(taskId);
    }
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
    refetchAll();
  }, [date]);

  useEffect(() => {
    const next = taskLists?.find((e) => e.id === taskListId) || null;
    setTaskList(next);
  }, [taskLists, taskListId]);

  return (
    <>
      <Container className="relative h-screen">
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="relative mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{kstDate}</span>
            <div
              className="flex items-center gap-pr-4 text-b-secondary"
              onClick={() => setDetailTaskId(null)}
              ref={ref}
            >
              <PrevButtonIcon className="cursor-pointer" onClick={prev} />
              <NextButtonIcon className="cursor-pointer" onClick={next} />
              <CalendarButtonIcon
                className="ml-pr-8 cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              />
            </div>
          </div>
        </div>
        <ul className="mt-pr-24 flex gap-pr-12 text-16m">
          {taskLists?.map((taskList) => (
            <Link
              href={createUrlString({
                pathname: [groupId, 'tasklist'],
                queryParams: { id: taskList.id },
              })}
              key={taskList.id}
            >
              <li
                className={classNames(
                  taskList.id === taskListId
                    ? 'text-t-primary'
                    : 'text-t-default',
                  `cursor-pointer`,
                )}
              >
                {taskList.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16">
          {taskList?.tasks.map((task) => (
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
            onClick={() => openModal(<AddTask />)}
            className={classNames('w-pr-125', detailTaskId && 'hidden')}
            rounded
          />
        </div>
      </Container>
    </>
  );
}
