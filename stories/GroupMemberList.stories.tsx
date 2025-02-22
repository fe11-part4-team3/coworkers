import GroupMemberList from '@/app/[teamId]/(index)/GroupMemberList';
import { IMember } from '@/types/group.type';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof GroupMemberList> = {
  title: 'Components/GroupMemberList',
  component: GroupMemberList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    role: {
      control: {
        type: 'select',
        options: ['ADMIN', 'MEMBER'],
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GroupMemberList>;

const getMockMembers = (length: number): IMember[] =>
  Array.from({ length }, (_, index) => ({
    role: index === 0 ? 'ADMIN' : 'MEMBER',
    userImage: null,
    userEmail: `member${index + 1}@example.com`,
    userName: `Member ${index + 1}`,
    groupId: 1,
    userId: index + 1,
  }));

//NOTE 멤버 수를 조정하려면 해당 상수를 변경해 주세요
const memberCount = 10;

export const Default: Story = {
  args: {
    members: getMockMembers(memberCount),
  },
};
