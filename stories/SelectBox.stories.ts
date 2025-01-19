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
    options: ['옵션1', '옵션2', '옵션3'],
    defaultValue: '',
  },
};

export const Modal: Story = {
  args: {
    placeholder: '반복 안함',
    onValueChange: (value: string) => console.log('선택된 옵션:', value),
    options: ['반복 안함', '한 번', '매일', '주 반복', '월 반복'],
    width: 'w-pr-109',
    defaultValue: '',
  },
};

export const Sort: Story = {
  args: {
    defaultValue: '최신순',
    onValueChange: (value: string) => console.log('선택된 옵션:', value),
    options: ['최신순', '좋아요순'],
    width: 'w-pr-120 mo:w-pr-94',
  },
};
