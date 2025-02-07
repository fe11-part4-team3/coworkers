'use client';

import { format, subDays, addDays } from 'date-fns';
import { useState } from 'react';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import TaskDetail from '@/components/TaskDetail/TaskDetail';
import useModalStore from '@/stores/modalStore';

import { taskMockData, commentMockData } from './mockData';

export default function TaskListPage() {
  const { isOpen, openModal, closeModal } = useModalStore();
  const [date, setDate] = useState(new Date());

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

  const formattedDate = format(date, 'M월 d일 (E)');

  return (
    <>
      <Container>
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div className="flex items-center gap-pr-4 text-b-secondary">
              <PrevButtonIcon
                className="cursor-pointer"
                onClick={handlePrevDate}
              />
              <NextButtonIcon
                className="cursor-pointer"
                onClick={handleNextDate}
              />
              <CalendarButtonIcon className="ml-pr-8 cursor-pointer" />
            </div>
          </div>
        </div>
        <ul className="mt-pr-24">
          <li>목록 이름</li>
          <button onClick={() => (isOpen === false ? openModal : closeModal)}>
            테스트용 상세 버튼
          </button>
        </ul>
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
      </Container>
    </>
  );
}
