import Container from '@/components/layout/Container';
import TaskCard from '@/components/TaskCard/TaskCard';
import { newDate } from '@/utils/dateConversion';

import historyMock from './mock.json';

function MyHistoryPage() {
  // 필요한 값만 추출하여 새로운 배열 생성
  const tasksDone = historyMock.tasksDone.map((task) => ({
    id: task.id,
    name: task.name,
    date: task.date,
    doneAt: task.doneAt,
    frequency: task.frequency as 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY',
    commentCount: 0,
  }));

  // doneAt 날짜를 기준으로 그룹화
  const groupedTasks = tasksDone.reduce(
    (acc, task) => {
      const date = newDate(task.doneAt || '');
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(task);
      return acc;
    },
    {} as Record<string, typeof tasksDone>,
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
