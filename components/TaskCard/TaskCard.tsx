'use client';

import { useState } from 'react';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCardProps } from '@/types/taskCard.type';
import IconText from '@/components/IconLabel';
import TaskCheckbox from '@/components/TaskCard/TaskCheckbox';
import KebabDropDown from '@/components/KebabDropDown';

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
function TaskCard({ type, taskData, updateTask }: TaskCardProps) {
  const { id, name, description, date, doneAt, commentCount, frequency } =
    taskData;
  const [isChecked, setIsChecked] = useState(Boolean(doneAt));
  const isTaskList = type === 'taskList';
  const frequencyText = frequencyList[frequency];

  const handleCheckedToggle = () => {
    if (isTaskList) {
      setIsChecked(!isChecked);
      updateTask({
        taskId: id,
        body: {
          name: name,
          description: description ? description : '',
          done: !isChecked,
        },
      });
    }
  };

  return (
    <Card
      className={`${isTaskList && 'h-pr-74'} flex w-full cursor-pointer flex-col justify-between rounded-lg border-none bg-b-secondary px-pr-18 py-pr-16`}
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
            <div className="ml-pr-12 mr-pr-8 mo:ml-auto">
              <IconText type="commentCount" text={commentCount} />
            </div>

            <div className="ml-auto mo:ml-0">
              <KebabDropDown
                onEdit={() => alert('수정')}
                onDelete={() => alert('삭제')}
              />
            </div>
          </>
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
