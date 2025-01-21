import TaskDetailComment from '@/components/TaskDetailComment/TaskDetailComment';
import { Meta, StoryObj } from '@storybook/react';
import useUserStore from '@/stores/useUser.store';

const meta: Meta<typeof TaskDetailComment> = {
  title: 'Components/TaskDetailComment',
  component: TaskDetailComment,
};

export default meta;
type Story = StoryObj<typeof TaskDetailComment>;

const mockUserStore = (userId: number) => {
  useUserStore.setState({
    user: {
      id: userId,
      memberships: [],
      teamId: '',
      updatedAt: '',
      createdAt: '',
      email: '',
      image: null,
      nickname: '',
    },
  });
};

export const DropdownVisible: Story = {
  args: {
    commentData: {
      id: 2575,
      content: '댓글 테스트입니다. 드롭다운이 보이는 경우.',
      createdAt: '2025-01-20T14:12:07+09:00',
      updatedAt: '2025-01-20T14:12:02+09:00',
      user: {
        id: 1327,
        nickname: '휘철',
        image: null,
      },
    },
  },
  decorators: [
    (Story) => {
      mockUserStore(1327);
      return <Story />;
    },
  ],
};

export const DropdownHidden: Story = {
  args: {
    commentData: {
      id: 2576,
      content: '댓글 테스트입니다. 드롭다운이 보이지 않는 경우.',
      createdAt: '2025-01-20T14:12:07+09:00',
      updatedAt: '2025-01-20T14:12:02+09:00',
      user: {
        id: 1328,
        nickname: '테스트',
        image: null,
      },
    },
  },
  decorators: [
    (Story) => {
      mockUserStore(1327);
      return <Story />;
    },
  ],
};
