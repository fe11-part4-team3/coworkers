import type { Meta, StoryObj } from '@storybook/react';

import Profile from '@/components/Profile/Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    image: {
      control: 'text',
      description: '프로필 이미지 경로',
      defaultValue: '',
    },
    variant: {
      control: 'radio',
      options: ['member', 'group'],
      description: '기본 프로필 이미지 설정',
      defaultValue: 'member',
    },
    profileSize: {
      control: 'number',
      description: '프로필 이미지 사이즈',
      defaultValue: 64,
    },
    isEdit: {
      control: 'boolean',
      description: '수정 기능 사용 여부',
      defaultValue: false,
    },
    editSize: {
      control: 'number',
      description: '수정 버튼 아이콘 사이즈',
      defaultValue: 24,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Profile>;

export const Default: Story = {
  args: {
    variant: 'member',
  },
};

export const EditableProfile: Story = {
  args: {
    variant: 'group',
    isEdit: true,
    profileSize: 80,
    editSize: 30,
  },
};
