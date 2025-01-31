import { useState } from 'react';
import { Meta, StoryFn } from '@storybook/react';
import ImageUpload from '@/components/ImageUpload/ImageUpload';

export default {
  title: 'Components/ImageUpload',
  component: ImageUpload,
  argTypes: {
    fileValue: {
      control: {
        type: 'object',
      },
    },
    setFileValue: {
      action: 'setFileValue',
    },
  },
} as Meta;

const Template: StoryFn<typeof ImageUpload> = (args) => {
  const [fileValue, setFileValue] = useState<File | null>(null);
  return (
    <ImageUpload {...args} fileValue={fileValue} setFileValue={setFileValue} />
  );
};

export const Default = Template.bind({});
Default.args = {
  fileValue: null,
};
