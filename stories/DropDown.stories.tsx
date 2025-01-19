import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import DropDown, { DropDownProps } from '@/components/DropDown';

export default {
  title: 'Components/DropDown',
  component: DropDown,
  argTypes: {
    trigger: { control: 'text' },
    items: { control: 'object' },
    align: {
      control: {
        type: 'select',
        options: ['start', 'center'],
      },
    },
    width: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<DropDownProps> = (args) => <DropDown {...args} />;

export const Default = Template.bind({});
Default.args = {
  trigger: <button>Open Menu</button>,
  items: [
    { text: 'Item 1', href: '/item1' },
    { text: 'Item 2', href: '/item2' },
    { text: 'Item 3', onClick: () => alert('Item 3 clicked') },
  ],
  width: 'w-pr-100',
};
