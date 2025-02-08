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

import { taskMockData, commentMockData } from './mockData';
import { getTaskList } from '@/service/taskList.api';
import { useQuery, useMutation } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import TaskCard from '@/components/TaskCard/TaskCard';
import { createTask } from '@/service/task.api';
import { TaskRecurringCreateDto } from '@/types/task.type';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import { useEffect, useRef } from 'react';
import Link from 'next/link';

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

  const fetchTaskList = async () => {
    const response = await getTaskList({ groupId, id: taskListId });
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

  const {
    data: taskListData,
    error: taskListError,
    isLoading: taskListIsLoading,
  } = useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: fetchTaskList,
  });

  const {
    data: createTaskData,
    error: createTaskError,
    mutate: createTaskMutate,
  } = useMutation({
    mutationFn: fetchCreateTask,
    onError: (error) => {
      console.error(error);
    },
  });

  const createTaskMutation = useMutation({
    mutationFn: fetchCreateTask,
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

  const handlePostCommentTest = () => {
    console.log('댓글 등록');
  };

  const handleDeleteTask = () => {
    console.log('할 일 삭제');
  };

  const handleUpdateTask = () => {
    console.log('할 일 수정');
  };

  const handleUpdateTaskStatus = () => {
    console.log('할 일 상태 수정');
  };

  const handleDeleteComment = () => {
    console.log('댓글 삭제');
  };

  const handleUpdateComment = () => {
    console.log('댓글 수정');
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

  if (taskListError) {
    console.error(taskListError);
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  console.log(taskListData);

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
        <ul className="mt-pr-24 flex gap-pr-12 text-16m text-t-default">
          {taskLists?.map((taskList) => (
            <Link href={`/${groupId}/${taskList.id}`} key={taskList.id}>
              <li className="cursor-pointer">{taskList.name}</li>
            </Link>
          ))}
          <button onClick={() => setIsDetailOpen(!isDetailOpen)}>
            테스트용 상세 버튼
          </button>
        </ul>
        <div className='mt-pr-16 flex flex-col gap-pr-16'>
        {taskListData?.tasks.map((task) => (
          <TaskCard key={task.id} type="taskList" taskData={task} />
        ))}
        </div>
        <div className="fixed bottom-pr-48 right-pr-80">
          <div className="relative flex w-pr-116 items-center">
            <Buttons
              text="할 일 추가"
              rounded={true}
              icon={true}
              onClick={() => openModal(<AddTask fetchData={fetchCreateTask} />)}
            />
            <PlusIcon width={24} height={24} className="absolute left-pr-12" />
          </div>
        </div>
        <TaskDetail
          isOpen={isDetailOpen}
          setIsOpen={setIsDetailOpen}
          value={taskMockData}
          commentData={commentMockData}
          postComment={handlePostCommentTest}
          deleteTask={handleDeleteTask}
          updateTask={handleUpdateTask}
          updateTaskStatus={handleUpdateTaskStatus}
          deleteComment={handleDeleteComment}
          updateComment={handleUpdateComment}
        />
      </Container>
    </>
  );
}
