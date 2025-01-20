import TaskCard from '@/components/TaskCard/TaskCard';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof TaskCard> = {
  title: 'Components/TaskCard',
  component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

export const DAILY: Story = {
  args: {
    type: 'taskList',
    taskData: {
      id: 16166,
      name: '팀미팅',
      date: '2025-01-20T09:00:00+09:00',
      doneAt: '2025-01-17T15:53:25+09:00',
      commentCount: 23,
      frequency: 'DAILY',
    },
  },
};

export const ONCE: Story = {
  args: {
    type: 'taskList',
    taskData: {
      id: 16166,
      name: '팀미팅',
      date: '2025-01-20T09:00:00+09:00',
      doneAt: null,
      commentCount: 0,
      frequency: 'ONCE',
    },
  },
};

export const WEEKLY: Story = {
  args: {
    type: 'taskList',
    taskData: {
      id: 16166,
      name: '팀미팅',
      date: '2025-01-20T09:00:00+09:00',
      doneAt: '2025-01-17T15:53:25+09:00',
      commentCount: 0,
      frequency: 'WEEKLY',
    },
  },
};

export const MONTHLY: Story = {
  args: {
    type: 'taskList',
    taskData: {
      id: 16166,
      name: '팀미팅',
      date: '2025-01-20T09:00:00+09:00',
      doneAt: null,
      commentCount: 0,
      frequency: 'MONTHLY',
    },
  },
};
