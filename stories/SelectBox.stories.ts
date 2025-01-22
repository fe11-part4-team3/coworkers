import SelectBox from '@/components/SelectBox';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SelectBox> = {
  title: 'Components/SelectBox',
  component: SelectBox,
};

export default meta;
type Story = StoryObj<typeof SelectBox>;

export const Default: Story = {
  args: {
    placeholder: '옵션을 선택하세요',
    onValueChange: (value: string) => console.log('선택된 옵션:', value),
    options: [
      { label: '옵션1', value: 'OPTION1' },
      { label: '옵션2', value: 'OPTION2' },
      { label: '옵션3', value: 'OPTION3' },
    ],
    defaultValue: '',
  },
};

export const Modal: Story = {
  args: {
    onValueChange: (value: string) => console.log('선택된 옵션:', value),
    options: [
      { label: '반복 안함', value: 'ONCE' },
      { label: '매일', value: 'DAILY' },
      { label: '주 반복', value: 'WEEKLY' },
      { label: '월 반복', value: 'MONTHLY' },
    ],
    width: 'w-pr-109',
    defaultValue: 'ONCE',
  },
};

export const Sort: Story = {
  args: {
    onValueChange: (value: string) => console.log('선택된 옵션:', value),
    options: [
      { label: '최신순', value: 'like' },
      { label: '좋아요순', value: 'recent' },
    ],
    width: 'w-pr-120 mo:w-pr-94',
    defaultValue: 'like',
  },
};
