import { Meta, StoryFn } from '@storybook/react';

import ImageUpload from '@/app/boards/addarticle/ImageUpload';
import useForm from '@/hooks/useForm';

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
  const { preview, handleFileChange, handleClearImage } = useForm({});

  return (
    <ImageUpload
      {...args}
      preview={preview ?? null}
      handleFileChange={handleFileChange}
      handleClearImage={handleClearImage}
    />
  );
};

export const Default = Template.bind({});
