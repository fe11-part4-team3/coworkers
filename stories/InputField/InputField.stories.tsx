import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputField, {
  InputFieldProps,
} from '@/components/InputField/InputField';

export default {
  title: 'Components/InputField',
  component: InputField,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['text', 'password', 'email'],
      },
    },
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    error: { control: 'text' },
    disabled: { control: 'boolean' },
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => (
  <InputField {...args} />
);

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  value: '',
  label: 'Label',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const Error = Template.bind({});
Error.args = {
  type: 'text',
  value: '',
  label: 'Label',
  placeholder: 'Placeholder를 작성해주세요',
  error: 'This is an error message',
  disabled: false,
};

export const Password = Template.bind({});
Password.args = {
  type: 'password',
  value: '',
  label: 'Password',
  placeholder: 'Enter your password',
  disabled: false,
};
