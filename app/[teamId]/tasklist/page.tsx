'use client';

import { format, subDays, addDays } from 'date-fns';
import { ko } from 'date-fns/locale';
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

  const formattedDate = format(date, 'M월 d일 (E)', { locale: ko });

  return (
    <>
      <Container>
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div className="flex items-center gap-pr-4">
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
          <button onClick={isOpen === false ? openModal : closeModal}>
            테스트용 상세 버튼
          </button>
        </ul>
        {isOpen && (
          <TaskDetail
            value={taskMockData}
            commentData={commentMockData}
            postComment={handlePostCommentTest}
          />
        )}
      </Container>
    </>
  );
}
