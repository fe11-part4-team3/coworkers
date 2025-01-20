import { Meta, StoryObj } from '@storybook/react';
import Profile from '@/components/Profile/Profile';

const meta: Meta<typeof Profile> = {
  title: 'Components/Profile',
  component: Profile,
  argTypes: {
    src: {
      control: 'text',
      description: 'Path to the profile image.',
      defaultValue: '',
    },
    variant: {
      control: 'radio',
      options: ['member', 'group'],
      description: 'Type of profile placeholder image.',
      defaultValue: 'member',
    },
    profileSize: {
      control: 'number',
      description: 'Size of the profile image.',
      defaultValue: 64,
    },
    isEdit: {
      control: 'boolean',
      description: 'Whether the edit button is shown.',
      defaultValue: false,
    },
    editSzie: {
      control: 'number',
      description: 'Size of the edit button.',
      defaultValue: 24,
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for the profile component.',
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
    editSzie: 30,
  },
};
