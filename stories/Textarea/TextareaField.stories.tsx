import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import TextareaField from '@/components/InputField/TextareaField';
import { TextareaFieldProps } from '@/types/inputField.type';

export default {
  title: 'Components/TextareaField',
  component: TextareaField,
  argTypes: {
    value: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['md', 'lg'],
      },
    },
    label: { control: 'text' },
    height: { control: 'text' },
    placeholder: { control: 'text' },
    essential: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
  },
} as Meta;

const Template: StoryFn<TextareaFieldProps> = (args) => (
  <TextareaField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  value: '',
  size: 'md',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const LableEssential = Template.bind({});
LableEssential.args = {
  value: '',
  size: 'md',
  label: 'Label',
  essential: true,
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const Large = Template.bind({});
Large.args = {
  value: '',
  size: 'lg',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const CustomHeight = Template.bind({});
CustomHeight.args = {
  value: '',
  size: 'lg',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
  height: 'h-pr-200',
};
