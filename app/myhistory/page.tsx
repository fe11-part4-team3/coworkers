'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';

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
        <p>로딩 중...</p>
      ) : tasksDone.length === 0 ? (
        <p>완료한 작업이 없습니다.</p>
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
    </Container>
  );
}

export default MyHistoryPage;
