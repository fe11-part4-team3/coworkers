import { Meta, StoryFn } from '@storybook/react';
import InputField, {
  InputFieldProps,
} from '@/components/InputField';

export default {
  title: 'stories/InputField', // 스토리북 경로
  component: InputField,
  argTypes: {
    value: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<InputFieldProps> = (
  args: InputFieldProps,
) => <InputField {...args} />;

export const Default = Template.bind({});
Default.args = {
  value: 'Default Value',
  label: 'Default Label',
  placeholder: 'Enter text...',
};

export const NoLabel = Template.bind({});
NoLabel.args = {
  value: 'No Label Value',
  placeholder: 'Enter text...',
};

export const CustomPlaceholder = Template.bind({});
CustomPlaceholder.args = {
  value: '',
  label: 'Custom Label',
  placeholder: 'Custom Placeholder...',
};
