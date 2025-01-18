'use client';

import { useState } from 'react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCardProps } from '@/types/taskCard.type';

import IconText from './IconLabel';
import KebabButton from './KebabButton';
import TaskCheckbox from './TaskCheckbox';

const frequencyList: Record<string, string> = {
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
  ONCE: '한 번 실행',
};

/**
 * @param {'history' | 'taskList} type - 페이지별 카드 형태
 * @param {string} name - 할 일 제목
 * @param {string} date - 할 일 날짜
 * @param  {string | null} doneAt - 할 일 완료 유무
 * @param  {number} commentCount - 할 일 댓글 수
 * @param  {string} frequency - 반복 일정 종류
 * @returns {JSX.Element} 할 일 카드 컴포넌트
 */
function TaskCard({
  type,
  name,
  date,
  doneAt,
  commentCount,
  frequency,
}: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(Boolean(doneAt));
  const isTaskList = type === 'taskList';
  const frequencyText = frequencyList[frequency];

  const handleCheckedToggle = () => {
    if (isTaskList) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <Card
      className={`${isTaskList && 'h-pr-74'} flex w-full flex-col justify-between rounded-lg border-none bg-b-secondary px-pr-18 py-pr-16`}
    >
      <CardContent className="items-top flex p-0">
        <TaskCheckbox
          name={name}
          isChecked={isChecked}
          handleCheckedToggle={handleCheckedToggle}
          isTaskList={isTaskList}
        />

        {isTaskList && (
          <>
            <IconText type="commentCount" text={commentCount} />
            <KebabButton />
          </>
        )}
      </CardContent>

      {isTaskList && (
        <CardFooter className="flex gap-pr-20 p-0">
          <IconText type="calendar" text={newDate(date)} hasBar />
          <IconText type="time" text={newTime(date)} hasBar />
          <IconText type="repeat" text={frequencyText} />
        </CardFooter>
      )}
    </Card>
  );
}

export default TaskCard;
