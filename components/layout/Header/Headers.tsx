'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import SideNavigation from '@/components/SideNavigation/SideNavigation';

import Profile from './Profile';
import useUser from '@/hooks/useUser';
import Logo from './Logo';
import useGroupList from '@/hooks/useGroupList';

function Headers() {
  const deviceType = useDeviceType();
  const router = useRouter();
  const { isAuthenticated, accessToken } = useAuth();
  const { user, groups, isPending } = useUser();
  const { currentGroup } = useGroupList();

  useEffect(() => {
    console.log('인증상태', isAuthenticated);
    console.log('유저 정보', user);
    console.log('토큰', accessToken);
  }, [user]);

  useEffect(() => {
    if (!isPending && !currentGroup) {
      router.push('/');
    }
  }, [isPending, currentGroup]);

  return (
    <header className="fixed flex w-full items-center border-b bg-b-secondary transition-all">
      <nav className="mx-auto flex h-pr-60 w-pr-1200 items-center justify-between px-pr-40 mo:px-pr-16 ta:px-pr-25">
        <div className="flex items-center gap-pr-40 ta:gap-pr-24">
          {deviceType === 'mobile' && user && (
            <>
              <SideNavigationTrigger
                src="/images/icon-gnb-menu.svg"
                alt="그룹 네비게이션"
              />
              <SideNavigation
                groups={groups}
                isPending={isPending}
                showSkeleton={true}
                skeletonLength={10}
              />
            </>
          )}

          <Logo />

          {deviceType !== 'mobile' && user && (
            <>
              <NavigationGroupDropdown
                groups={groups}
                isPending={isPending}
                currentGroup={currentGroup}
              />

              <Link href="/boards">
                <Button variant="link">
                  <span className="text-16m">자유게시판</span>
                </Button>
              </Link>
            </>
          )}
        </div>

        {user && (
          <Link href="/mypage">
            <Button variant="link">
              <Profile userName={user.nickname} profileImage={user.image} />
            </Button>
          </Link>
        )}
      </nav>
    </header>
  );
}

export default Headers;
