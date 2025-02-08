import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import ArrowTooltip from '@/components/ArrowTooltip';

const meta: Meta<typeof ArrowTooltip> = {
  title: 'Components/Arrowooltip',
  component: ArrowTooltip,
  argTypes: {
    state: {
      control: {
        type: 'select',
        options: ['ERROR', 'WARNING', 'DEFAULT'],
      },
    },
    children: {
      control: 'text',
    },
  },
};

export default meta;

const Template: StoryFn<typeof ArrowTooltip> = (args) => (
  <ArrowTooltip {...args} />
);

export const Default = Template.bind({});
Default.args = {
  state: 'DEFAULT',
  children: '기본 상태입니다.',
};

export const Error = Template.bind({});
Error.args = {
  state: 'ERROR',
  children: '에러가 발생했습니다.',
};

export const Warning = Template.bind({});
Warning.args = {
  state: 'WARNING',
  children: '경고 메시지입니다.',
};
