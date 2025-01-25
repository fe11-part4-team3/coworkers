import ArticleCommentTextarea from '@/components/ArticleCommentTextarea/ArticleCommentTextarea';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/ArticleCommentTextarea',
  component: ArticleCommentTextarea,
} as Meta;

const Template: StoryFn<typeof ArticleCommentTextarea> = (args) => (
  <ArticleCommentTextarea {...args} />
);

export const Default = Template.bind({});
