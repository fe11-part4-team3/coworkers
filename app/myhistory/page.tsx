'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { getHistory } from '@/service/user.api';
import { newDate } from '@/utils/dateConversion';
import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';
import Empty from '@/components/Empty/Empty';
import { Skeleton } from '@/components/ui/skeleton';
import { ITaskMetadata } from '@/types/task.type';
import { useSnackbar } from '@/contexts/SnackBar.context';

function MyHistoryPage() {
  const { showSnackbar } = useSnackbar();

  const {
    data: tasksDone = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasksDone'],
    queryFn: getHistory,
  });

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

  useEffect(() => {
    if (error)
      showSnackbar(
        '작업 내역을 불러오는데 실패했습니다. 다시 시도해주세요.',
        'error',
      );
  }, [error]);

  if (isLoading)
    return (
      <Container>
        <div className="pt-pr-40 tamo:pt-pr-24">
          <div className="space-y-pr-40">
            <div className="flex flex-col gap-pr-16">
              <Skeleton className="h-pr-20 w-pr-80" />
              {Array.from({ length: 3 }).map((_, index) => (
                <Skeleton
                  key={index}
                  className="h-pr-48 w-full rounded-pr-12"
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    );

  return (
    <Container>
      <div className="pt-pr-40 tamo:pt-pr-24">
        <h1 className="mb-pr-24 text-20b mo:mb-pr-27 mo:text-18b">
          마이 히스토리
        </h1>
        {tasksDone.length === 0 ? (
          <Empty>
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
      </div>
    </Container>
  );
}

export default MyHistoryPage;
