import TaskDetailComment from '@/components/TaskDetailComment/TaskDetailComment';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskDetailComment> = {
  title: 'Components/TaskDetailComment',
  component: TaskDetailComment,
};

export default meta;
type Story = StoryObj<typeof TaskDetailComment>;

export const Default: Story = {
  args: {
    commentData: {
      id: 16166,
      content: '팀미팅',
      createdAt: '2025-01-20T09:00:00+09:00',
      user: {
        id: 1,
        nickname: '휘철',
        image: null,
      },
    },
  },
};
