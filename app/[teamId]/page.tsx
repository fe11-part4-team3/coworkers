'use client';

import Container from '@/components/layout/Container';
import GroupMemberCard from '@/components/GroupMemberCard/GroupMemberCard';
import { IMember } from '@/types/group.type';
import useUser from '@/hooks/useUser';

const MOCK_MEMBER: IMember = {
  role: 'ADMIN',
  userImage: null,
  userEmail: 'example@example.com',
  userName: '김쁠뿡',
  groupId: 0,
  userId: 0,
};

export default function TeamPage() {
  useUser(true);

  return (
    <>
      <Container>
        <GroupMemberCard member={MOCK_MEMBER} />
      </Container>
    </>
  );
}
