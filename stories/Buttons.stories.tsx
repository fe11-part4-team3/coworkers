// src/components/ui/button/Buttons.stories.tsx

import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { ButtonsProps } from '@/types/buttons.type';
import Buttons from '@/components/Buttons';

// Mock icon component for demonstration
const MockIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" />
  </svg>
);

export default {
  title: 'Components/Buttons',
  component: Buttons,
  argTypes: {
    text: { control: 'text' },
    href: { control: 'text' },
    width: { control: 'text' },
    size: {
      control: {
        type: 'select',
        options: ['S', 'M', 'L', 'XL'],
      },
      defaultValue: 'XL',
    },
    textColor: {
      control: {
        type: 'select',
        options: ['default', 'white', 'primary'],
      },
      defaultValue: 'white',
    },
    backgroundColor: {
      control: {
        type: 'select',
        options: ['default', 'white', 'gradient', 'danger', 'none'],
      },
      defaultValue: 'default',
    },
    icon: { control: 'boolean' },
    rounded: { control: 'boolean' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    border: {
      control: {
        type: 'select',
        options: ['default', 'primary', 'secondary', 'disabled'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['button', 'submit'],
      },
    },
    onClick: { action: 'clicked' },
    onSubmit: { action: 'submitted' },
  },
} as Meta;

const Template: StoryFn<ButtonsProps> = (args) => <Buttons {...args} />;

// 기본 버튼
export const Default = Template.bind({});
Default.args = {
  text: 'Default Button',
  onClick: () => {},
};

// 아이콘이 포함된 버튼
export const WithIcon = Template.bind({});
WithIcon.args = {
  text: 'Button with Icon',
  icon: <MockIcon />,
  onClick: () => {},
};

// 로딩 상태 버튼
export const Loading = Template.bind({});
Loading.args = {
  text: 'Loading Button',
  loading: true,
  onClick: () => {},
};

// 비활성화된 버튼
export const Disabled = Template.bind({});
Disabled.args = {
  text: 'Disabled Button',
  disabled: true,
  onClick: () => {},
};

// 다양한 크기의 버튼
export const Size = () => (
  <div className="space-y-4">
    <Buttons text="Small" size="S" />
    <Buttons text="Medium" size="M" />
    <Buttons text="Large" size="L" />
    <Buttons text="Extra Large" />
  </div>
);

// 다양한 배경 색상의 버튼
export const Backgrounds = () => (
  <div className="space-y-4">
    <Buttons text="Default" backgroundColor="default" />
    <Buttons text="White" backgroundColor="white" textColor="primary" />
    <Buttons text="Gradient" backgroundColor="gradient" />
    <Buttons text="Danger" backgroundColor="danger" />
    <Buttons text="None" backgroundColor="none" />
  </div>
);

// 링크 버튼
export const LinkButton = Template.bind({});
LinkButton.args = {
  text: 'Go to Home',
  href: '/',
};

// 원형 버튼
export const Rounded = Template.bind({});
Rounded.args = {
  text: 'Rounded Button',
  rounded: true,
  onClick: () => {},
};

// 버튼 테두리 변형
export const BorderVariants = () => (
  <div className="space-y-4">
    <Buttons text="Default Border" border="default" />
    <Buttons text="Primary Border" border="primary" />
    <Buttons text="Secondary Border" border="secondary" />
    <Buttons text="Disabled Border" border="default" disabled={true} />
  </div>
);

export const ProjectButtons = () => (
  <div className="space-y-4">
    <Buttons text="생성하기" />
    <Buttons text="생성하기" disabled />
    <Buttons
      text="생성하기"
      backgroundColor="white"
      textColor="primary"
      border="primary"
    />
    <Buttons
      text="생성하기"
      backgroundColor="white"
      textColor="primary"
      border="primary"
      disabled
    />
    <Buttons
      text="생성하기"
      backgroundColor="white"
      textColor="default"
      border="secondary"
    />
    <Buttons text="생성하기" backgroundColor="danger" textColor="white" />
    <Buttons
      text="생성하기"
      backgroundColor="none"
      textColor="primary"
      border="primary"
    />
    <Buttons
      text="생성하기"
      backgroundColor="none"
      textColor="primary"
      border="primary"
      disabled
    />
    <Buttons text="할일 추가" icon={<MockIcon />} rounded />
    <Buttons
      text="완료 취소하기"
      icon={<MockIcon />}
      rounded
      backgroundColor="white"
      border="primary"
      textColor="primary"
    />
    <Buttons text="그냥 텍스트만 있는 버튼" backgroundColor="none" />
    <Buttons
      text="그냥 텍스트만 있는 버튼"
      backgroundColor="none"
      textColor="primary"
    />
  </div>
);
