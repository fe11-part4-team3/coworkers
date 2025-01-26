import { Meta, StoryObj } from '@storybook/react';
import TimePicker from '@/components/DateTimePicker/TimePicker';

const meta: Meta<typeof TimePicker> = {
  title: 'Components/TimePicker',
  component: TimePicker,
};

type Story = StoryObj<typeof TimePicker>;

export default meta;

export const Default: Story = {
  args: { width: '300' },
};
