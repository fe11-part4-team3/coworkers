import type { Meta, StoryFn } from '@storybook/react';

import ImageUpload from '@/components/ImageUpload/ImageUpload';
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
  const { preview, handleFileChange, handleClearPreview } = useForm({});

  return (
    <ImageUpload
      {...args}
      preview={preview ?? null}
      handleFileChange={handleFileChange}
      handleClearPreview={handleClearPreview}
    />
  );
};

export const Default = Template.bind({});
