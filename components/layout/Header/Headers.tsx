'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';

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
  const router = useRouter();
  const { teamId } = useParams();
  const groupId = teamId ? Number(teamId) : null;
  const { isAuthenticated, accessToken } = useAuth();
  const { user, initializeUserData } = useUserStore();
  const [selected, setSelected] = useState<string | null>(null);
  const { data: groups, isPending } = useQuery({
    queryKey: ['groups'],
    queryFn: getGroupList,
    enabled: isAuthenticated,
  });

  useEffect(() => {
    // 컴포넌트가 마운트될 때 사용자 데이터를 초기화
    initializeUserData();
  }, [initializeUserData]);

  useEffect(() => {
    console.log('인증상태', isAuthenticated);
    console.log('유저 정보', user);
    console.log('토큰', accessToken);
  }, [user]);

  useEffect(() => {
    if (!groupId || !groups || isPending) {
      setSelected(null);
      return;
    }

    /**
     * NOTE
     * 선택된 그룹을 찾는 로직
     * 선택된 그룹이 없으면 리다이렉트
     */
    // const isSelected = groups.some((group) => {
    //   if (group.id === groupId) {
    //     setSelected(group.name);
    //     return true;
    //   }
    //   return false;
    // });

    // if (!isSelected) router.push('/');
  }, [groupId, groups]);

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
                loading={isPending}
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
                selected={selected}
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
