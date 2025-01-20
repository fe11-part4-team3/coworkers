'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { useAuth } from '@/hooks/useAuth';
import useUserStore from '@/stores/useUser.store';
import { Button } from '@/components/ui/button';
import { getGroupList } from '@/service/user.api';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import SideNavigation from '@/components/SideNavigation/SideNavigation';

import Profile from './Profile';
import Logo from './Logo';

function Headers() {
  const deviceType = useDeviceType();
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();
  const { data: groups } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroupList,
    enabled: isAuthenticated,
  });

  return (
    <header className="fixed flex h-pr-60 w-full items-center border-b bg-b-secondary transition-all">
      <div className="mx-auto flex w-pr-1200 items-center gap-pr-40 px-pr-40 mo:px-pr-16 ta:gap-pr-24 ta:px-pr-25">
        {deviceType === 'mobile' && (
          <nav>
            <SideNavigationTrigger
              src="/images/icon-gnb-menu.svg"
              alt="그룹 네비게이션"
            />
            <SideNavigation
              groups={groups}
              loading={false}
              showSkeleton={true}
              skeletonLength={10}
            />
          </nav>
        )}
        <Logo />
        {deviceType !== 'mobile' && (
          <nav className="ml-4 flex items-center space-x-4">
            <NavigationGroupDropdown groups={groups} />
            <Link href="/boards">
              <Button variant="link">
                <span className="text-16m">마이페이지</span>
              </Button>
            </Link>
          </nav>
        )}

        {isAuthenticated && user && (
          <>
            <Profile userName={user.nickname} profileImage={user.image} />
            <Link href="/mypage">
              <Button variant="link">마이페이지</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Headers;
