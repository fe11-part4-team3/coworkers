'use client';

import Container from '@/components/layout/Container';
import getMockGroups from '@/components/SideNavigation/mockGroups';
import SideNavigationBar from '@/components/SideNavigation/SideNavigation';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import { IGroup } from '@/types/group.type';
import { useState } from 'react';

export default function TeamPage() {
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);

  setTimeout(() => {
    setLoading(false);
    setGroups(getMockGroups(10));
  }, 3000);

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
        팀 페이지
      </Container>
    </>
  );
}
