'use client';

import { subDays, addDays } from 'date-fns';
import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import TaskDetail from '@/components/TaskDetail/TaskDetail';
import DatePicker from '@/components/DateTimePicker/DatePicker';

import { getTaskList } from '@/service/taskList.api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import TaskCard from '@/components/TaskCard/TaskCard';
import { createTask, updateTask, deleteTask } from '@/service/task.api';
import { TaskRecurringCreateDto } from '@/types/task.type';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  getTaskComment,
  createTaskComment,
  updateTaskComment,
  deleteTaskComment,
} from '@/service/comment.api';

export default function TaskListPage() {
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const { openModal } = useModalStore();

  const pathName = usePathname();
  const groupId = Number(pathName.split('/')[1]);
  const taskListId = Number(pathName.split('/')[2]);

  const { taskLists } = useGroup(groupId);

  const fetchGetTaskList = async () => {
    const response = await getTaskList({
      groupId,
      id: taskListId,
      date: String(date),
    });
    return response;
  };

  const fetchCreateTask = async (body: TaskRecurringCreateDto) => {
    const response = await createTask({
      groupId,
      taskListId,
      body,
    });
    return response;
  };

  const fetchUpdateTask = async (
    taskId: number,
    body: { name: string; description: string; done: boolean },
  ) => {
    const response = await updateTask({
      groupId,
      taskListId,
      taskId,
      ...body,
    });
    return response;
  };

  const fetchDeleteTask = async (taskId: number) => {
    const response = await deleteTask({ groupId, taskListId, taskId });
    return response;
  };

  const fetchGetTaskComment = async (taskId: number) => {
    const response = await getTaskComment({ taskId });
    return response;
  };

  const fetchPostTaskComment = async (taskId: number, content: string) => {
    const response = await createTaskComment({ taskId, content });
    return response;
  };

  const fetchUpdateTaskComment = async (
    taskId: number,
    commentId: number,
    content: string,
  ) => {
    const response = await updateTaskComment({ taskId, commentId, content });
    return response;
  };

  const fetchDeleteTaskComment = async (taskId: number, commentId: number) => {
    const response = await deleteTaskComment({ taskId, commentId });
    return response;
  };

  const {
    data: taskListData,
    error: taskListError,
    isLoading: taskListIsLoading,
    refetch,
  } = useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: fetchGetTaskList,
  });

  const { error: createTaskError, mutate: createTaskMutate } = useMutation({
    mutationFn: (body: TaskRecurringCreateDto) => fetchCreateTask(body),
    onError: (error) => {
      console.error(error);
    },
    onMutate: async () => {
      await refetch();
    },
  });

  const { error: updateTaskError, mutate: updateTaskMutate } = useMutation({
    mutationFn: (variables: {
      taskId: number;
      body: { name: string; description: string; done: boolean };
    }) => fetchUpdateTask(variables.taskId, variables.body),
    onError: (error) => {
      console.error(error);
    },
    onMutate: async () => {
      await refetch();
    },
  });

  const { error: deleteTaskError, mutate: deleteTaskMutate } = useMutation({
    mutationFn: (taskId: number) => fetchDeleteTask(taskId),
    onError: (error) => {
      console.error(error);
    },
    onMutate: async () => {
      await refetch();
    },
  });

  const {
    error: getTaskCommentError,
    data: getTaskCommentData,
    mutate: getTaskCommentMutate,
  } = useMutation({
    mutationFn: (taskId: number) => fetchGetTaskComment(taskId),
    onError: (error) => {
      console.error(error);
    },
  });

  const { error: postTaskCommentError, mutate: postTaskCommentMutate } =
    useMutation({
      mutationFn: (variables: { taskId: number; content: string }) =>
        fetchPostTaskComment(variables.taskId, variables.content),
      onError: (error) => {
        console.error(error);
      },
    });

  const { error: updateTaskCommentError, mutate: updateTaskCommentMutate } =
    useMutation({
      mutationFn: (variables: {
        taskId: number;
        commentId: number;
        content: string;
      }) =>
        fetchUpdateTaskComment(
          variables.taskId,
          variables.commentId,
          variables.content,
        ),
      onError: (error) => {
        console.error(error);
      },
    });

  const { error: deleteTaskCommentError, mutate: deleteTaskCommentMutate } =
    useMutation({
      mutationFn: (variables: { taskId: number; commentId: number }) =>
        fetchDeleteTaskComment(variables.taskId, variables.commentId),
      onError: (error) => {
        console.error(error);
      },
    });

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

  if (taskListIsLoading) return <div>로딩 중...</div>;

  if (
    taskListError ||
    createTaskError ||
    updateTaskError ||
    deleteTaskError ||
    getTaskCommentError ||
    postTaskCommentError ||
    updateTaskCommentError ||
    deleteTaskCommentError
  ) {
    console.error(
      taskListError ||
        createTaskError ||
        updateTaskError ||
        deleteTaskError ||
        getTaskCommentError ||
        postTaskCommentError ||
        updateTaskCommentError ||
        deleteTaskCommentError,
    );
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <Container>
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="relative mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div
              className="flex items-center gap-pr-4 text-b-secondary"
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
              {isCalendarOpen && date && (
                <div className="absolute left-0 top-pr-50 z-50">
                  <DatePicker
                    width="w-pr-300"
                    date={date}
                    setDate={setDate}
                    setIsPickerView={setIsCalendarOpen}
                  />
                </div>
              )}
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
          {taskListData?.tasks.map((task) => (
            <div key={task.id} onClick={() => getTaskCommentMutate(task.id)}>
              <TaskCard
                type="taskList"
                taskData={task}
                onClick={() => setIsDetailOpen(!isDetailOpen)}
              />
              <TaskDetail
                isOpen={isDetailOpen}
                setIsOpen={setIsDetailOpen}
                value={task}
                commentData={getTaskCommentData}
                postComment={postTaskCommentMutate}
                deleteTask={deleteTaskMutate}
                updateTask={updateTaskMutate}
                updateTaskStatus={updateTaskMutate}
                deleteComment={() => deleteTaskCommentMutate}
                updateComment={() => updateTaskCommentMutate}
              />
            </div>
          ))}
        </div>
        <div className="fixed bottom-pr-48 right-pr-80">
          <div className="relative flex w-pr-116 items-center">
            <Buttons
              text="할 일 추가"
              rounded={true}
              icon={true}
              onClick={() =>
                openModal(<AddTask fetchData={createTaskMutate} />)
              }
            />
            <PlusIcon width={24} height={24} className="absolute left-pr-12" />
          </div>
        </div>
      </Container>
    </>
  );
}
