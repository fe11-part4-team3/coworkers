'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';
import Empty from '@/components/Empty/Empty';
import { Skeleton } from '@/components/ui/skeleton';
import SnackBar from '@/components/SnackBar/SnackBar.styled';

import { newDate } from '@/utils/dateConversion';
import { getHistory } from '@/service/user.api';

import { ITaskMetadata } from '@/types/task.type';

function MyHistoryPage({ forceEmpty = false }: { forceEmpty?: boolean }) {
  const {
    data: tasksDone = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasksDone'],
    queryFn: getHistory,
    staleTime: 1000 * 60 * 5,
  });

  const displayTasks = forceEmpty ? [] : tasksDone;

  const groupedTasks = displayTasks.reduce(
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

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState('');
  const [snackBarSeverity, setSnackBarSeverity] = useState<'success' | 'error'>(
    'success',
  );

  useEffect(() => {
    if (!snackBarOpen) {
      if (error) {
        setSnackBarMessage('에러가 발생했어요!');
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
      } else if (!isLoading && displayTasks.length === 0) {
        setSnackBarMessage('완료한 작업이 없어요!');
        setSnackBarSeverity('error');
        setSnackBarOpen(true);
      } else if (!isLoading) {
        setSnackBarMessage('완료한 작업들 불러오기 성공!');
        setSnackBarSeverity('success');
        setSnackBarOpen(true);
      }
    }
  }, [error, isLoading, displayTasks]);

  return (
    <Container className="pt-pr-40 tamo:pt-pr-24">
      <h1 className="mb-pr-24 text-20b mo:mb-pr-27 mo:text-18b">
        마이 히스토리
      </h1>

      {isLoading ? (
        <div className="space-y-pr-16">
          <Skeleton className="h-pr-24 w-pr-120" />
          <Skeleton className="h-pr-64 w-full" />
          <Skeleton className="h-pr-64 w-full" />
          <Skeleton className="h-pr-64 w-full" />
        </div>
      ) : displayTasks.length === 0 ? (
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
                <TaskCard
                  key={task.id}
                  type="history"
                  taskData={{ ...task, commentCount: 0 }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      <SnackBar
        severity={snackBarSeverity}
        open={snackBarOpen}
        onClose={() => setSnackBarOpen(false)}
      >
        {snackBarMessage}
      </SnackBar>
    </Container>
  );
}

export default MyHistoryPage;
