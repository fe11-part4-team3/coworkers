import TaskDetail from '@/components/TaskDetail/TaskDetail';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskDetail> = {
  title: 'Components/TaskDetail',
  component: TaskDetail,
};

export default meta;

type Story = StoryObj<typeof TaskDetail>;

export const Default: Story = {
  args: {
    value: {
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
    },
    commentData: [
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
    ],
    postComment: () => {
      console.log('댓글 등록');
    },
  },
};
