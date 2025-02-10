'use client';

import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';
import { newDate } from '@/utils/dateConversion';
import { getHistory } from '@/service/user.api';
import { useEffect, useState } from 'react';
import { ITaskMetadata } from '@/types/task.type';
// import instance from '@/service/axios';
// import historyMock from './mock.json';

function MyHistoryPage() {
  const [tasksDone, setTasksDone] = useState<ITaskMetadata[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await getHistory();
        console.log('📌 API 응답 데이터:', data);
        setTasksDone(data);
      } catch (error) {
        console.error('Failed to fetch history:', error);
      }
    };

    fetchHistory();
  }, []);

  // doneAt 날짜를 기준으로 그룹화
  const groupedTasks = tasksDone.reduce(
    (acc, task) => {
      if (!task.doneAt) return acc; // null 값 무시

      const date = newDate(task.doneAt); // newDate 함수 사용
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {} as Record<string, ITaskMetadata[]>,
  );

  // 날짜별로 정렬 (최신 날짜가 위쪽으로)
  const sortedDates = Object.keys(groupedTasks).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime(),
  );

  return (
    <Container className="pt-pr-40 tamo:pt-pr-24">
      <h1 className="mb-pr-24 text-20b mo:mb-pr-27 mo:text-18b">
        마이 히스토리
      </h1>
      <div className="space-y-pr-40">
        {sortedDates.map((date) => (
          <div key={date} className="flex flex-col gap-pr-16">
            <h2 className="text-16m">{date}</h2>
            {groupedTasks[date].map((task) => (
              <TaskCard key={task.id} type="history" taskData={task} />
            ))}
          </div>
        ))}
      </div>
    </Container>
  );
}
export default MyHistoryPage;
