'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';
import Empty from '@/components/Empty/Empty';
import { Skeleton } from '@/components/ui/skeleton';
import { newDate } from '@/utils/dateConversion';
import { getHistory } from '@/service/user.api';
import { ITaskMetadata } from '@/types/task.type';

function MyHistoryPage() {
  const [tasksDone, setTasksDone] = useState<ITaskMetadata[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        setTasksDone(data ?? []);
      } catch {
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const groupedTasks = tasksDone.reduce(
    (acc, task) => {
      const date = newDate(task.doneAt ?? task.date);
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {} as Record<string, ITaskMetadata[]>,
  );

  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  return (
    <Container className="pt-pr-40 tamo:pt-pr-24">
      <h1 className="mb-pr-24 text-20b mo:mb-pr-27 mo:text-18b">
        마이 히스토리
      </h1>
      {loading ? (
        <div className="space-y-pr-16">
          <Skeleton className="h-pr-24 w-pr-120" />
          <Skeleton className="h-pr-64 w-full" />
          <Skeleton className="h-pr-64 w-full" />
          <Skeleton className="h-pr-64 w-full" />
        </div>
      ) : tasksDone.length === 0 ? (
        <Empty className="mt-pr-150">
          <Empty.TextWrapper>
            <Empty.Text text="완료한 작업이 없습니다." />
          </Empty.TextWrapper>
        </Empty>
      ) : (
        <div className="space-y-pr-40">
          {sortedDates.map((date) => (
            <div key={date} className="flex flex-col gap-pr-16">
              <h2 className="text-16m">{date}</h2>
              {groupedTasks[date].map((task) => (
                <TaskCard key={task.id} type="history" task={task} />
              ))}
            </div>
          ))}
        </div>
      )}
    </Container>
  );
}

export default MyHistoryPage;
