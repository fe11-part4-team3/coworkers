'use client';

import Container from '@/components/layout/Container';
import GroupMemberCard from '@/components/GroupMemberCard.tsx/GroupMemberCard';
import { IMember } from '@/types/group.type';

const MOCK_MEMBER: IMember = {
  role: 'ADMIN',
  userImage: null,
  userEmail: 'example@example.com',
  userName: '김쁠뿡',
  groupId: 0,
  userId: 0,
};

export default function TeamPage() {
  return (
    <>
      <Container>
        <GroupMemberCard member={MOCK_MEMBER} />
      </Container>
    </>
  );
}
