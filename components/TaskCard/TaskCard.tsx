'use client';

import { useState } from 'react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCardProps } from '@/types/taskCard.type';

import IconText from '../IconLabel';
import KebabButton from './KebabButton';
import TaskCheckbox from './TaskCheckbox';

const frequencyList: Record<
  'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | string,
  string
> = {
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
  ONCE: '한 번 실행',
};

/**
 * @param {'history' | 'taskList'} props.type - 페이지별 카드 형태
 * @param {object} props.taskData - 할 일 데이터
 * @returns {JSX.Element} 할 일 카드 컴포넌트
 */
function TaskCard({ type, taskData }: TaskCardProps) {
  const { id, name, date, doneAt, commentCount, frequency } = taskData;
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
      <CardContent className="flex items-center p-0">
        <TaskCheckbox
          name={name}
          isChecked={isChecked}
          handleCheckedToggle={handleCheckedToggle}
          isTaskList={isTaskList}
        />

        {isTaskList && (
          <>
            <IconText type="commentCount" text={commentCount} />
            <KebabButton taskId={id} />
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
