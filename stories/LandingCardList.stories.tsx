import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import LandingCardList from '@/components/Landing/LandingCardList';
import Container from '@/components/layout/Container';

const meta: Meta<typeof LandingCardList> = {
  title: 'Components/LandingCardList',
  component: LandingCardList,
};

export default meta;

const Template: StoryFn<typeof LandingCardList> = () => (
  <Container className="flex flex-col items-center justify-center">
    <LandingCardList />
  </Container>
);
export const Default = Template.bind({});
Default.args = {};
