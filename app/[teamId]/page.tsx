'use client';

import { useEffect, useState } from 'react';

import Container from '@/components/layout/Container';
import getMockGroups from '@/components/SideNavigation/mockGroups';
import SideNavigationBar from '@/components/SideNavigation/SideNavigation';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
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
  const [loading, setLoading] = useState(true);
  const groups = getMockGroups(10);

  setTimeout(() => {
    setLoading(false);
  }, 3000);

  useEffect(() => {
    setLoading(true);
  }, []);

  return (
    <>
      <SideNavigationBar
        groups={groups}
        loading={loading}
        showSkeleton={true}
        skeletonLength={10}
      />
      <Container>
        <SideNavigationTrigger
          src="images/icon-gnb-menu.svg"
          alt="사이드 네비게이션 열기"
        />
        <GroupMemberCard member={MOCK_MEMBER} />
      </Container>
    </>
  );
}
