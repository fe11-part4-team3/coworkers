import SearchInput from '@/components/SearchInput/SearchInput';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof SearchInput> = {
  title: 'Components/SearchInput',
  component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: (e) => console.log('Search value:', e.target.value),
  },
};
