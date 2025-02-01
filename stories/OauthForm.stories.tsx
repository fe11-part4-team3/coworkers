import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import OauthForm from '@/components/OauthForm';

export default {
  title: 'Components/OauthForm',
  component: OauthForm,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['login', 'signup'],
      },
      description: '로그인 또는 회원가입 유형',
      defaultValue: 'login',
    },
  },
} as Meta;

const Template: StoryFn<{ type: 'login' | 'signup' }> = (args) => (
  <OauthForm {...args} />
);

export const Login = Template.bind({});
Login.args = {
  type: 'login',
};

export const Signup = Template.bind({});
Signup.args = {
  type: 'signup',
};
