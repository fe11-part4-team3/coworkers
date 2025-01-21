import { Meta, StoryObj } from '@storybook/react';
import Buttons from '@/components/Buttons';
import ICON_COMPLETE from '@/public/images/icon-complete.svg';
import ICON_PLUS from '@/public/images/icon-plus.svg';

const meta: Meta<typeof Buttons> = {
  title: 'Components/Buttons',
  component: Buttons,
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'secondary', 'destructive', ''],
    },
    bg: {
      control: 'select',
      options: ['white', 'gradient', 'none', 'default'],
    },
    size: {
      control: 'select',
      options: ['S', 'M', 'L', 'XL'],
    },
    icon: {
      control: 'object',
    },
    rounded: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    loading: {
      control: 'boolean',
    },
    href: {
      control: 'text',
    },
    onClick: { action: 'clicked' },
    width: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Buttons>;

// onClick을 사용하는 기본 버튼
export const Default: Story = {
  args: {
    text: '기본 버튼',
    onClick: () => alert('기본 버튼 클릭됨'),
    variant: '',
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 아웃라인 버튼
export const Outline: Story = {
  args: {
    text: '아웃라인 버튼',
    variant: 'outline',
    onClick: () => alert('아웃라인 버튼 클릭됨'),
    bg: 'white',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 세컨더리 버튼
export const Secondary: Story = {
  args: {
    text: '세컨더리 버튼',
    variant: 'secondary',
    onClick: () => alert('세컨더리 버튼 클릭됨'),
    bg: 'white',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 경고 및 강조 버튼
export const Destructive: Story = {
  args: {
    text: '경고 및 강조 버튼',
    variant: 'destructive',
    onClick: () => alert('경고 및 강조 버튼 클릭됨'),
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 비활성화 버튼
export const Disabled: Story = {
  args: {
    text: '비활성화 버튼',
    disabled: true,
    onClick: () => alert('비활성화 버튼 클릭됨'), // disabled일 때 onClick은 무시됩니다.
    variant: '',
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 로딩 버튼 (disabled가 true로 설정됨)
export const Loading: Story = {
  args: {
    text: '로딩 버튼',
    onClick: () => alert('로딩 버튼 클릭됨'),
    variant: '',
    bg: 'default',
    size: 'XL',
    loading: true,
    rounded: false,
  },
};

// 링크 버튼
export const WithLink: Story = {
  args: {
    text: '링크 버튼',
    href: '/destination',
    variant: '',
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 아이콘 버튼
export const IconButton: Story = {
  args: {
    text: '아이콘 버튼',
    icon: <ICON_PLUS />,
    onClick: () => alert('아이콘 버튼 클릭됨'),
    variant: '',
    bg: 'default',
    size: 'L',
    loading: false,
    rounded: true,
  },
};

// 그라데이션 배경 버튼
export const GradientBackground: Story = {
  args: {
    text: '그라데이션 배경 버튼',
    onClick: () => alert('그라데이션 배경 버튼 클릭됨'),
    variant: '',
    bg: 'gradient',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 배경색 없음 버튼
export const NoBackground: Story = {
  args: {
    text: '배경색 없음 버튼',
    onClick: () => alert('배경색 없음 버튼 클릭됨'),
    variant: '',
    bg: 'none',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

// 배경색 없음 + 아웃라인 버튼
export const transparentOutline: Story = {
  args: {
    text: '배경색 없음 + 아웃라인 버튼',
    onClick: () => alert('배경색 없음 + 아웃라인 버튼 클릭됨'),
    variant: 'outline',
    bg: 'none',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

export const customButton1: Story = {
  args: {
    text: '생성하기',
    onClick: () => alert('생성하기 클릭됨'),
    bg: 'default',
    size: 'S',
    loading: false,
    rounded: false,
    width: 'w-pr-74',
  },
};

export const customButton2: Story = {
  args: {
    text: '생성하기',
    onClick: () => alert('생성하기 클릭됨'),
    variant: 'outline',
    bg: 'none',
    size: 'S',
    loading: false,
    rounded: false,
    width: 'w-pr-74',
  },
};

export const customButton3: Story = {
  args: {
    text: '생성하기',
    onClick: () => alert('생성하기 클릭됨'),
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

export const customButton4: Story = {
  args: {
    text: '생성하기',
    onClick: () => alert('생성하기 클릭됨'),
    variant: 'outline',
    bg: 'none',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

export const customButton5: Story = {
  args: {
    text: '닫기',
    onClick: () => alert('닫기 클릭됨'),
    variant: 'secondary',
    bg: 'white',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

export const customButton6: Story = {
  args: {
    text: '회원탈퇴',
    onClick: () => alert('회원탈퇴 클릭됨'),
    variant: 'destructive',
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: false,
  },
};

export const customButton7: Story = {
  args: {
    text: '할일 추가',
    icon: <ICON_PLUS />,
    onClick: () => alert('할일 추가 클릭됨'),
    bg: 'default',
    size: 'XL',
    loading: false,
    rounded: true,
    width: 'w-pr-125',
  },
};

export const customButton8: Story = {
  args: {
    text: '완료 하기',
    icon: <ICON_COMPLETE className="text-icon-inverse" />,
    onClick: () => alert('완료 하기 클릭됨'),
    bg: 'default',
    size: 'L',
    loading: false,
    rounded: true,
    width: 'w-pr-111',
  },
};

export const customButton9: Story = {
  args: {
    text: '완료 취소하기',
    icon: <ICON_COMPLETE className="text-icon-brand" />,
    onClick: () => alert('완료 취소하기 클릭됨'),
    bg: 'white',
    size: 'L',
    loading: false,
    rounded: true,
    width: 'w-pr-138',
    variant: 'outline',
  },
};
