import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TodayProgressChart from '@/app/[teamId]/(index)/charts/TodayProgressChart';

export default {
  title: 'Components/TodayProgressChart',
  component: TodayProgressChart,
} as Meta;

const Template: StoryFn<typeof TodayProgressChart> = (args) => (
  <TodayProgressChart {...args} />
);

export const Default = Template.bind({});
Default.args = {
  tasks: [],
};

export const ZeroThirds = Template.bind({});
ZeroThirds.args = {
  tasks: [
    {
      doneBy: {
        user: null,
      },
      writer: null,
      displayIndex: 0,
      commentCount: 0,
      deletedAt: null,
      recurringId: 0,
      frequency: 'DAILY',
      updatedAt: '2025-01-31T15:23:16.207Z',
      doneAt: null,
      date: '2025-01-31T15:23:16.207Z',
      description: 'string',
      name: 'string',
      id: 0,
    },
    {
      doneBy: {
        user: null,
      },
      writer: null,
      displayIndex: 0,
      commentCount: 0,
      deletedAt: null,
      recurringId: 0,
      frequency: 'DAILY',
      updatedAt: '2025-01-31T15:23:16.207Z',
      doneAt: null,
      date: '2025-01-31T15:23:16.207Z',
      description: 'string',
      name: 'string',
      id: 0,
    },
    {
      doneBy: {
        user: null,
      },
      writer: null,
      displayIndex: 0,
      commentCount: 0,
      deletedAt: null,
      recurringId: 0,
      frequency: 'DAILY',
      updatedAt: '2025-01-31T15:23:16.207Z',
      doneAt: null,
      date: '2025-01-31T15:23:16.207Z',
      description: 'string',
      name: 'string',
      id: 0,
    },
  ],
};

export const OneThirds = Template.bind({});
OneThirds.args = {
  tasks: [
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '감자튀김',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '코올슬로',
      displayIndex: 0,
      doneAt: null,
      doneBy: { user: null },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '치킨너겟',
      displayIndex: 0,
      doneAt: null,
      doneBy: { user: null },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
  ],
};

export const TwoThirds = Template.bind({});
TwoThirds.args = {
  tasks: [
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '감자튀김',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '코올슬로',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '치킨너겟',
      displayIndex: 0,
      doneAt: null,
      doneBy: { user: null },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
  ],
};

export const ThreeThirds = Template.bind({});
ThreeThirds.args = {
  tasks: [
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '감자튀김',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '코올슬로',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
    {
      commentCount: 0,
      date: '2025-01-31T09:00:00+09:00',
      deletedAt: null,
      description: '치킨너겟',
      displayIndex: 0,
      doneAt: '2025-01-31T09:00:00+09:00',
      doneBy: { user: { id: 1319, image: null, nickname: 'test1' } },
      frequency: 'ONCE',
      id: 17515,
      name: 'test1',
      recurringId: 4386,
      updatedAt: '2025-01-31T09:00:00+09:00',
      writer: { id: 1319, image: null, nickname: 'test1' },
    },
  ],
};
