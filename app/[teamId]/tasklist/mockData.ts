// 테스트용 추후 삭제 예정
import { ITask } from '@/types/task.type';
export const taskMockData: ITask = {
  doneBy: {
    user: null,
  },
  writer: {
    image: null,
    nickname: '작성자 닉네임',
    id: 1,
  },
  displayIndex: 0,
  commentCount: 7,
  deletedAt: '2025-01-24T01:11:18.356Z',
  recurringId: 0,
  frequency: 'DAILY',
  updatedAt: '2025-01-24T01:11:18.356Z',
  doneAt: '2025-01-24T01:11:18.356Z',
  date: '2025-01-24T01:11:18.356Z',
  description: '설명설명설명',
  name: '이름이름이름',
  id: 1,
};

export const commentMockData = [
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 1,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 2,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 3,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 4,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 5,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 6,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
  {
    content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
    createdAt: '2025-01-23T22:21:57.295Z',
    updatedAt: '2025-01-23T22:21:57.295Z',
    id: 7,
    user: {
      image: null,
      nickname: '댓글 작성자',
      id: 1,
    },
  },
];
