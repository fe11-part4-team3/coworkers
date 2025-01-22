import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
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

const meta: Meta<typeof ArticleCard> = {
  title: 'Components/ArticleCard',
  component: ArticleCard,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: { type: 'radio' },
      options: ['normal', 'best'],
      description: '카드의 타입을 선택합니다.',
      defaultValue: 'normal',
    },
    articleData: {
      control: 'object',
      description: '기사의 상세 데이터를 전달합니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const normalArticleAuthor = {
  id: 1,
  title: '일반 기사 제목 예시 - 작성자와 일치',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  createdAt: '2024-04-27T10:00:00+09:00',
  updatedAt: '2024-04-27T12:00:00+09:00',
  writer: {
    id: 101,
    nickname: '작성자 이름',
    image: 'https://via.placeholder.com/50',
  },
  likeCount: 25,
};

const normalArticleNonAuthor = {
  id: 2,
  title: '일반 기사 제목 예시 - 작성자와 불일치',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
  createdAt: '2024-04-26T09:30:00+09:00',
  updatedAt: '2024-04-26T11:30:00+09:00',
  writer: {
    id: 102,
    nickname: '다른 작성자',
    image: 'https://via.placeholder.com/50',
  },
  likeCount: 40,
};

const bestArticleAuthor = {
  id: 3,
  title: '베스트 기사 제목 예시 - 작성자와 일치',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/coworkers/user/1299/licensed-image.jpeg',
  createdAt: '2024-04-25T08:20:00+09:00',
  updatedAt: '2024-04-25T10:20:00+09:00',
  writer: {
    id: 101,
    nickname: '작성자 이름',
    image: 'https://via.placeholder.com/50',
  },
  likeCount: 150,
};

const bestArticleNonAuthor = {
  id: 4,
  title: '베스트 기사 제목 예시 - 작성자와 불일치',
  image:
    'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/coworkers/user/1299/licensed-image.jpeg',
  createdAt: '2024-04-24T07:15:00+09:00',
  updatedAt: '2024-04-24T09:15:00+09:00',
  writer: {
    id: 103,
    nickname: '다른 베스트 작성자',
    image: 'https://via.placeholder.com/50',
  },
  likeCount: 200,
};

export const NormalAuthor: Story = {
  args: {
    type: 'normal',
    articleData: normalArticleAuthor,
  },
  decorators: [
    (Story) => {
      mockUserStore(101);
      return <Story />;
    },
  ],
};

export const NormalNonAuthor: Story = {
  args: {
    type: 'normal',
    articleData: normalArticleNonAuthor,
  },
  decorators: [
    (Story) => {
      mockUserStore(999);
      return <Story />;
    },
  ],
};

export const BestAuthor: Story = {
  args: {
    type: 'best',
    articleData: bestArticleAuthor,
  },
  decorators: [
    (Story) => {
      mockUserStore(101);
      return <Story />;
    },
  ],
};

export const BestNonAuthor: Story = {
  args: {
    type: 'best',
    articleData: bestArticleNonAuthor,
  },
  decorators: [
    (Story) => {
      mockUserStore(999);
      return <Story />;
    },
  ],
};

export const NormalNoImage: Story = {
  args: {
    type: 'normal',
    articleData: {
      ...normalArticleNonAuthor,
      image: '',
    },
  },
  decorators: [
    (Story) => {
      mockUserStore(999);
      return <Story />;
    },
  ],
};

export const NormalLongTitle: Story = {
  args: {
    type: 'normal',
    articleData: {
      ...normalArticleNonAuthor,
      title:
        '이것은 매우 긴 제목의 기사 예시로, 여러 줄에 걸쳐 표시될 수 있습니다. 기사 제목은 길어질 수 있으며, 이를 통해 텍스트가 어떻게 처리되는지 확인할 수 있습니다.',
    },
  },
  decorators: [
    (Story) => {
      mockUserStore(999);
      return <Story />;
    },
  ],
};
