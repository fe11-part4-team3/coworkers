import React from 'react';
import { IArticle } from '@/types/article.type';
import ArticleCard from '@/components/ArticleCard/ArticleCard';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/ArticleCards',
  component: ArticleCard,
} as Meta;

const articleData: IArticle = {
  title: '자유게시판 게시글 제목입니다.',
  image: '/images/codeitprofile.png',
  createdAt: '2025-01-20T12:00:00Z',
  writer: {
    id: 1,
    nickname: 'John Doe',
  },
  likeCount: 120,
  updatedAt: '',
  id: 0,
};

// ArticleCard
const Template: StoryFn<{ articleData: IArticle }> = (args) => (
  <ArticleCard {...args} />
);

export const DefaultArticleCard = Template.bind({});
DefaultArticleCard.args = {
  articleData: articleData,
};
