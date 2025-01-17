'use client';

import {
  Card,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import IconText from './IconLabel';
import KebabButton from './KebabButton';
import TaskCheckbox from './TaskCheckbox';
import { newDate, newTime } from '@/utils/dateConversion';
import type { TaskCard } from '@/types/taskCard.type';
import { useState } from 'react';

const frequencyList: Record<string, string> = {
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
  ONCE: '한 번 실행',
};

function TaskCard({
  name,
  description, // 할 일 상세에서 사용될 것 같아 추가하였는데 다른 방법으로 작업 예정이시면 제거 부탁드립니다.
  date,
  doneAt,
  commentCount,
  frequency,
}: TaskCard) {
  const [isChecked, setIsChecked] = useState(
    Boolean(doneAt),
  );

  const toggleChecked = () => {
    setIsChecked(!isChecked);
  };

  const frequencyText = frequencyList[frequency];

  return (
    <Card className="flex h-pr-74 w-full flex-col justify-between rounded-lg border-none bg-[--b-secondary-light] px-pr-14 py-pr-12">
      <CardContent className="items-top flex p-0">
        <TaskCheckbox
          name={name}
          isChecked={isChecked}
          toggleChecked={toggleChecked}
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
