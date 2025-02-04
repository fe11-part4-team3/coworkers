import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import Empty from '@/components/Empty';

export default {
  title: 'Components/Empty',
  component: Empty,
} as Meta;

// 기본 텍스트만 있는 스토리
export const Default: StoryFn = () => (
  <Empty>
    <Empty.Text text="조회된 게시글이 없습니다." />
  </Empty>
);

// 텍스트와 버튼1만 있는 스토리
export const WithOneButton: StoryFn = () => (
  <Empty>
    <Empty.Text text="조회된 게시글이 없습니다." />
    <Empty.ButtonWrapper>
      <Empty.Buttons text="게시글 작성하기" href="/" />
    </Empty.ButtonWrapper>
  </Empty>
);

// 텍스트와 버튼1, 버튼2가 있는 스토리
export const WithTwoButtons: StoryFn = () => (
  <Empty>
    <Empty.Text text="조회된 게시글이 없습니다." />
    <Empty.ButtonWrapper>
      <Empty.Buttons text="게시글 작성하기" href="/" />
      <Empty.ButtonsBorder text="다른 작업하기" href="/" />
    </Empty.ButtonWrapper>
  </Empty>
);
