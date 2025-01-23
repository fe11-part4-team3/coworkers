'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import useUser from '@/hooks/useUser';
import { IGroup } from '@/types/group.type';

import Profile from './Profile';
import Logo from './Logo';

function Headers() {
  const deviceType = useDeviceType();
  const router = useRouter();
  const { teamId } = useParams();
  const groupId = teamId ? Number(teamId) : null;
  const { user, groups, isPending } = useUser();
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);

  useEffect(() => {
    if (!groupId || !groups || isPending) {
      setCurrentGroup(null);
      return;
    }
    const group = groups.find((group) => group.id === groupId);
    if (group) setCurrentGroup(group);
    else router.push('/');
  }, [groupId, groups, isPending]);

  return (
    <header className="fixed flex w-full items-center border-b bg-b-secondary transition-all">
      <nav className="mx-auto flex h-pr-60 w-pr-1200 items-center justify-between px-pr-40 mo:px-pr-16 ta:px-pr-25">
        <div className="flex items-center gap-pr-40 ta:gap-pr-24">
          {deviceType === 'mobile' && groups && (
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

          {deviceType !== 'mobile' && groups && (
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

        {user ? (
          <Link href="/mypage">
            <Button variant="link">
              <Profile userName={user.nickname} profileImage={user.image} />
            </Button>
          </Link>
        ) : (
          <div className="flex gap-pr-16">
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Headers;
