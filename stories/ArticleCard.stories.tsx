import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof ArticleCard> = {
  title: 'components/ArticleCard',
  component: ArticleCard,
  argTypes: {
    type: {
      control: 'radio',
      options: ['normal', 'best'],
      description: '베스트, 일반 게시글 설정',
      defaultValue: 'normal',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ArticleCard>;

const articleData = {
  id: 1084,
  title: '이렇게 남기면 되나요?',
  image: null,
  createdAt: '2025-01-16T21:31:20+09:00',
  updatedAt: '2025-01-16T21:31:20+09:00',
  writer: {
    id: 1299,
    nickname: '도널드덕',
  },
  likeCount: 9999,
  commentCount: 0,
};

export const NoImg: Story = {
  args: {
    type: 'best',
    articleData: articleData,
  },
};

export const HasImg: Story = {
  args: {
    type: 'best',
    articleData: {
      ...articleData,
      image:
        'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/1299/licensed-image.jpeg',
    },
  },
};
