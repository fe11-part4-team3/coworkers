import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import Comment from '@/components/Comment/Comment';
import useUserStore from '@/stores/useUser.store';

const mockUserStore = (userId: number | null) => {
  useUserStore.setState({
    user: userId
      ? {
          id: userId,
          memberships: [],
          teamId: '',
          updatedAt: '',
          createdAt: '',
          email: '',
          image: null,
          nickname: '',
        }
      : null,
  });
};

const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['article', 'task'],
      defaultValue: 'article',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Comment>;

const ArticleAuthorData = {
  id: 1773,
  content: '댓글 작성자가 아닌 경우 (DropDown 미노출)',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  writer: {
    id: 1300,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const ArticleNonAuthorData = {
  id: 1773,
  content: '댓글 작성자인 경우 (DropDown 노출)',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  writer: {
    id: 1299,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const ArticleLongContentData = {
  id: 1773,
  content:
    '긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  writer: {
    id: 1299,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const TaskAuthorData = {
  id: 1773,
  content: '댓글 작성자가 아닌 경우 (DropDown 미노출)',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  user: {
    id: 1300,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const TaskNonAuthorData = {
  id: 1773,
  content: '댓글 작성자인 경우 (DropDown 노출)',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  user: {
    id: 1299,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const TaskLongContentData = {
  id: 1773,
  content:
    '긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.긴 글 테스트입니다.',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  user: {
    id: 1299,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

export const ArticleAuthor: Story = {
  args: {
    commentData: ArticleAuthorData,
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const ArticleNonAuthor: Story = {
  args: {
    commentData: ArticleNonAuthorData,
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const ArticleLongContent: Story = {
  args: {
    commentData: ArticleLongContentData,
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const TaskAuthor: Story = {
  args: {
    commentData: TaskAuthorData,
    type: 'task',
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const TaskNonAuthor: Story = {
  args: {
    commentData: TaskNonAuthorData,
    type: 'task',
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const TaskLongContent: Story = {
  args: {
    commentData: TaskLongContentData,
    type: 'task',
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};
