import CommentTextarea, {
  CommentTextareaProps,
} from '@/components/CommentTextarea/CommentTextarea';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Components/CommentTextarea',
  component: CommentTextarea,
} as Meta;

const Template: StoryFn<CommentTextareaProps> = (args) => (
  <CommentTextarea {...args} />
);

export const Default = Template.bind({});
