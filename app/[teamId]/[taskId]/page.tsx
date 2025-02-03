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
import useModalStore from '@/stores/modalStore';
import DatePicker from '@/components/DateTimePicker/DatePicker';

import { taskMockData, commentMockData } from './mockData';
import { getTaskList } from '@/service/taskList.api';
import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import TaskCard from '@/components/TaskCard/TaskCard';
import { createTask } from '@/service/task.api';
import { TaskRecurringCreateDto } from '@/types/task.type';

export default function TaskListPage() {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [date, setDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const pathName = usePathname();
  const groupId = Number(pathName.split('/')[1]);
  const taskListId = Number(pathName.split('/')[2]);

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
    isLoading: createTaskIsLoading,
  } = useQuery({
    queryKey: ['task', groupId, taskListId],
    queryFn: fetchTaskList,
  });

  // const isoDate = date.toISOString();

  const handlePrevDate = () => {
    setDate(subDays(date, 1));
  };

  const handleNextDate = () => {
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

  if (taskListIsLoading || createTaskIsLoading) return <div>로딩 중...</div>;

  if (taskListError || createTaskError) {
    console.error(taskListError, createTaskError);
    return <div>에러가 발생했습니다.</div>;
  }

  console.log(taskListData);

  return (
    <>
      <Container>
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div className="relative flex items-center gap-pr-4 text-b-secondary">
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
              {isCalendarOpen && (
                <div className="absolute left-pr-100 top-0 z-50">
                  <DatePicker width="w-pr-300" isInput={false} />
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className="mt-pr-24">
          <li>목록 이름</li>
          <button onClick={() => (isOpen === false ? openModal : closeModal)}>
            테스트용 상세 버튼
          </button>
        </ul>
        {taskListData &&
          taskListData?.tasks.map((task) => (
            <TaskCard key={task.id} type="taskList" taskData={task} />
          ))}
        {isOpen && (
          <TaskDetail
            value={taskMockData}
            commentData={commentMockData}
            postComment={handlePostCommentTest}
            deleteTask={handleDeleteTask}
            updateTask={handleUpdateTask}
            updateTaskStatus={handleUpdateTaskStatus}
            deleteComment={handleDeleteComment}
            updateComment={handleUpdateComment}
          />
        )}
        <button onClick={() => openModal}>할 일 추가</button>
      </Container>
    </>
  );
}
