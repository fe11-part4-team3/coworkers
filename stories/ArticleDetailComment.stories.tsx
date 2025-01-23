import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ArticleDetailComment from '@/components/ArticleDetailComment/ArticleDetailComment';
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

const meta: Meta<typeof ArticleDetailComment> = {
  title: 'Components/ArticleDetailComment',
  component: ArticleDetailComment,
};

export default meta;
type Story = StoryObj<typeof ArticleDetailComment>;

const AuthorData = {
  id: 1773,
  content: '댓글 작성자가 아닌 경우 (DropDown 미노출)',
  createdAt: '2025-01-16T21:42:49+09:00',
  updatedAt: '2025-01-16T21:42:49+09:00',
  writer: {
    id: 1299,
    nickname: '도널드덕',
    image:
      'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  },
};

const NonAuthorData = {
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

const LongContentData = {
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

export const Author: Story = {
  args: {
    commentData: AuthorData,
  },
  decorators: [
    (Story) => {
      mockUserStore(101);
      return <Story />;
    },
  ],
};

export const NonAuthor: Story = {
  args: {
    commentData: NonAuthorData,
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};

export const LongContent: Story = {
  args: {
    commentData: LongContentData,
  },
  decorators: [
    (Story) => {
      mockUserStore(1299);
      return <Story />;
    },
  ],
};
