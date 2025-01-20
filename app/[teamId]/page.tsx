'use client';

import Container from '@/components/layout/Container';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import { useAuth } from '@/hooks/useAuth';
import { getGroupList } from '@/service/user.api';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

// import { IMember } from '@/types/group.type';
// const MOCK_MEMBER: IMember = {
//   role: 'ADMIN',
//   userImage: null,
//   userEmail: 'example@example.com',
//   userName: '김쁠뿡',
//   groupId: 0,
//   userId: 0,
// };

export default function TeamPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroupList,
  });

  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return (
    <Container>
      <SideNavigation
        groups={groups}
        loading={false}
        showSkeleton={true}
        skeletonLength={10}
      />
      <SideNavigationTrigger
        src="images/icon-gnb-menu.svg"
        alt="사이드 네비게이션 열기"
      />
    </Container>
  );
}
