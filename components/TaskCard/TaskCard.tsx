'use client';

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { newDate, newTime } from '@/utils/dateConversion';
import IconText from './IconLabel';
import KebabButton from './KebabButton';
import TaskCheckbox from './TaskCheckbox';
import type { TaskCardProps } from '@/types/taskCard.type';
import { useState } from 'react';

const frequencyList: Record<string, string> = {
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
  ONCE: '한 번 실행',
};

/**
 * @param param.name string
 * @param param.date string
 * @param param.doneAt string | null
 * @param param.commentCount number
 * @param param.frequency string
 * @returns 할 일 카드 컴포넌트
 */
function TaskCard({
  name,
  date,
  doneAt,
  commentCount,
  frequency,
}: TaskCardProps) {
  const [isChecked, setIsChecked] = useState(
    Boolean(doneAt),
  );

  const handleCheckedToggle = () => {
    setIsChecked(!isChecked);
  };

  const frequencyText = frequencyList[frequency];

  return (
    <Card className="flex h-pr-74 w-full flex-col justify-between rounded-lg border-none bg-[--b-secondary-light] px-pr-14 py-pr-12">
      <CardContent className="items-top flex p-0">
        <TaskCheckbox
          name={name}
          isChecked={isChecked}
          handleCheckedToggle={handleCheckedToggle}
        />
        <IconText type="commentCount" text={commentCount} />
        <KebabButton />
      </CardContent>

      <CardFooter className="flex gap-pr-20 p-0">
        <IconText
          type="calendar"
          text={newDate(date)}
          hasBar
        />
        <IconText type="time" text={newTime(date)} hasBar />
        <IconText type="repeat" text={frequencyText} />
      </CardFooter>
    </Card>
  );
}

export default TaskCard;
