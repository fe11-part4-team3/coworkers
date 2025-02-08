import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { SnackbarProvider, useSnackbar } from '@/contexts/SnackBar.context';
import Buttons from '@/components/Buttons';

const SampleComponent = () => {
  const { showSnackbar } = useSnackbar();

  const handleSuccessClick = () => {
    showSnackbar('완료 되었습니다.', 'success');
  };

  const handleErrorClick = () => {
    showSnackbar('에러가 발생 했습니다.', 'error');
  };

  return (
    <div className="space-y-4">
      <Buttons text="Success" onClick={handleSuccessClick} className="w-1/6" />
      <Buttons
        text="error"
        backgroundColor="danger"
        className="w-1/6"
        onClick={handleErrorClick}
      />
    </div>
  );
};
const meta: Meta = {
  title: 'Components/SnackBar',
  component: SampleComponent,
  decorators: [
    (Story) => (
      <SnackbarProvider>
        <Story />
      </SnackbarProvider>
    ),
  ],
};

export default meta;

const Template: StoryFn = (args) => <SampleComponent {...args} />;

export const Default = Template.bind({});
Default.args = {};
