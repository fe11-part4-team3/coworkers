import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import InputField from '@/components/InputField/InputField';
import { InputFieldProps } from '@/types/inputField.type';

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
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    width: { control: 'text' },
    essential: { control: 'boolean' },
    onChange: { action: 'changed' },
    onClick: { action: 'clicked' },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (args) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  type: 'text',
  value: '',
  label: 'Label',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const LableEssential = Template.bind({});
LableEssential.args = {
  type: 'text',
  value: '',
  label: 'Label',
  essential: true,
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
};

export const Error = Template.bind({});
Error.args = {
  type: 'text',
  value: '',
  label: 'Label',
  placeholder: 'Placeholder를 작성해주세요',
  errorMessage: 'This is an error message',
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

export const CustomWidth = Template.bind({});
CustomWidth.args = {
  type: 'text',
  value: '',
  label: 'Label',
  placeholder: 'Placeholder를 작성해주세요',
  disabled: false,
  width: 'w-pr-300',
};
