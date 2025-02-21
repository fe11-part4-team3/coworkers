'use client';

import { MouseEvent, useRef } from 'react';
import classNames from 'classnames';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCardProps } from '@/types/taskCard.type';
import IconText from '@/components/IconLabel';
import TaskCheckbox from '@/components/TaskCard/TaskCheckbox';
import { FrequencyType } from '@/types/task.type';

const frequencyList: Record<FrequencyType | string, string> = {
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
  ONCE: '한 번 실행',
};

/**
 * @param {'history' | 'taskList'} props.type - 페이지별 카드 형태
 * @param {object} props.task - 할 일 데이터
 * @returns {JSX.Element} 할 일 카드 컴포넌트
 */
function TaskCard({ type, task, onToggle, onClick }: TaskCardProps) {
  const { name, date, doneAt, frequency } = task;
  const isTaskList = type === 'taskList';
  const frequencyText = frequencyList[frequency];
  const checkboxRef = useRef<HTMLDivElement>(null);

  const handleClickTaskCard = (event: MouseEvent<HTMLDivElement>) => {
    if (checkboxRef.current?.contains(event.target as Node)) {
      event.stopPropagation();
      return;
    }
    if (isTaskList) onClick();
  };

  return (
    <Card
      className={classNames(
        isTaskList && 'h-pr-74 cursor-pointer',
        'flex w-full flex-col justify-between rounded-lg border-none bg-b-secondary px-pr-18 py-pr-16',
      )}
      onClick={handleClickTaskCard}
    >
      <CardContent className="flex items-center p-0">
        <TaskCheckbox
          ref={checkboxRef}
          name={name}
          isChecked={!!doneAt}
          isTaskList={isTaskList}
          onToggle={onToggle}
        />

        {isTaskList && (
          <div className="ml-pr-12 mr-pr-8 mo:ml-auto">
            <IconText type="commentCount" text={task.commentCount} />
          </div>
        )}
      </CardContent>

      {isTaskList && (
        <CardFooter className="flex p-0">
          <IconText type="calendar" text={newDate(date)} hasBar />
          <IconText type="time" text={newTime(date)} hasBar />
          <IconText type="repeat" text={frequencyText} />
        </CardFooter>
      )}
    </Card>
  );
}

export default TaskCard;
