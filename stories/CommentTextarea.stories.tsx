import TaskCommentTextarea, {
  CommentTextareaProps,
} from '@/components/TaskCommentTextarea/TaskCommentTextarea';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/TaskCommentTextarea',
  component: TaskCommentTextarea,
} as Meta;

const Template: StoryFn<CommentTextareaProps> = (args) => (
  <TaskCommentTextarea {...args} />
);

export const Default = Template.bind({});
