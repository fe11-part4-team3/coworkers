import { Meta, StoryObj } from '@storybook/react';
import DatePicker from '@/components/DateTimePicker/DatePicker';

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
};

type Story = StoryObj<typeof DatePicker>;

export default meta;

export const Default: Story = {
  args: { width: '300' },
};
