'use client';

import { MouseEvent, useRef, useState } from 'react';
import classNames from 'classnames';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCardProps } from '@/types/taskCard.type';
import IconText from '@/components/IconLabel';
import TaskCheckbox from '@/components/TaskCard/TaskCheckbox';
import { FrequencyType, ITask } from '@/types/task.type';

const frequencyList: Record<FrequencyType | string, string> = {
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
function TaskCard({ type, taskData, updateTask, setTask }: TaskCardProps) {
  const { id, name, description, date, doneAt, commentCount, frequency } =
    taskData;
  const [isChecked, setIsChecked] = useState(Boolean(doneAt));
  const isTaskList = type === 'taskList';
  const frequencyText = frequencyList[frequency];
  const checkboxRef = useRef<HTMLInputElement>(null);

  const handleClickTaskCard = (event: MouseEvent<HTMLDivElement>) => {
    if (checkboxRef.current?.contains(event.target as Node)) {
      if (setTask) setTask(null);
      return;
    }
    if (setTask) setTask(taskData as ITask);
  };

  const handleToggleCheckbox = () => {
    if (isTaskList && updateTask) {
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
      className={classNames(
        isTaskList && 'h-pr-74',
        'flex w-full flex-col justify-between rounded-lg border-none bg-b-secondary px-pr-18 py-pr-16',
      )}
      onClick={handleClickTaskCard}
    >
      <CardContent className="flex items-center p-0">
        <TaskCheckbox
          ref={checkboxRef}
          name={name}
          isChecked={Boolean(doneAt)}
          handleCheckedToggle={handleToggleCheckbox}
          isTaskList={isTaskList}
        />

        {isTaskList && (
          <div className="ml-pr-12 mr-pr-8 mo:ml-auto">
            <IconText type="commentCount" text={commentCount} />
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
