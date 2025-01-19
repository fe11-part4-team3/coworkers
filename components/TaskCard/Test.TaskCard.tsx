import TaskCard from '@/components/TaskCard/TaskCard';

/**
 * 임시 데이터(실제 데이터입니다.)
 * 로그인 구현 전까지는 임시 데이터를 사용하는 것이 편할 것 같아서 임시 데이터를 사용했습니다.
 *
 * 데이터 요청이 가능하다면 제거 부탁드립니다.
 */
const taskListData = [
  {
    id: 16166,
    name: '팀미팅',
    description: '팀미팅',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2025-01-16T18:50:27+09:00',
    user: null,
    recurringId: 4172,
    deletedAt: null,
    displayIndex: 0,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: null,
    },
    commentCount: 0,
    frequency: 'ONCE',
  },
  {
    id: 16167,
    name: '팀미팅2',
    description: '팀미팅2',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2025-01-16T18:51:13+09:00',
    user: null,
    recurringId: 4173,
    deletedAt: null,
    displayIndex: 1,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: null,
    },
    commentCount: 77,
    frequency: 'ONCE',
  },
  {
    id: 16168,
    name: '긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트',
    description: '팀미팅 2-1',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: '2025-01-17T15:53:25+09:00',
    updatedAt: '2025-01-17T15:53:25+09:00',
    user: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    recurringId: 4174,
    deletedAt: null,
    displayIndex: 2,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: {
        id: 1299,
        nickname: '휘철',
        image: null,
      },
    },
    commentCount: 100,
    frequency: 'WEEKLY',
  },
];

const historyData = [
  {
    id: 16166,
    name: '팀미팅',
    description: '팀미팅',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2025-01-16T18:50:27+09:00',
    user: null,
    recurringId: 4172,
    deletedAt: null,
    displayIndex: 0,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: null,
    },
    commentCount: 0,
    frequency: 'ONCE',
  },
  {
    id: 16167,
    name: '팀미팅2',
    description: '팀미팅2',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: null,
    updatedAt: '2025-01-16T18:51:13+09:00',
    user: null,
    recurringId: 4173,
    deletedAt: null,
    displayIndex: 1,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: null,
    },
    commentCount: 77,
    frequency: 'ONCE',
  },
  {
    id: 16168,
    name: '긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트긴제목테스트',
    description: '팀미팅 2-1',
    date: '2025-01-16T09:00:00+09:00',
    doneAt: '2025-01-17T15:53:25+09:00',
    updatedAt: '2025-01-17T15:53:25+09:00',
    user: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    recurringId: 4174,
    deletedAt: null,
    displayIndex: 2,
    writer: {
      id: 1299,
      nickname: '휘철',
      image: null,
    },
    doneBy: {
      user: {
        id: 1299,
        nickname: '휘철',
        image: null,
      },
    },
    commentCount: 100,
    frequency: 'WEEKLY',
  },
];

export default function TestTaskCard() {
  return (
    <div className="flex flex-col gap-pr-16">
      {taskListData.map((task) => {
        return <TaskCard key={task.id} type="taskList" taskData={task} />;
      })}

      {historyData.map((task) => {
        return <TaskCard key={task.id} type="history" taskData={task} />;
      })}
    </div>
  );
}
