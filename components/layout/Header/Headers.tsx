'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import useUser from '@/hooks/useUser';
import { IGroup } from '@/types/group.type';
import DropDown from '@/components/DropDown';

import Profile from './Profile';
import Logo from './Logo';

function Headers() {
  const deviceType = useDeviceType();
  const router = useRouter();
  const { teamId } = useParams();
  const groupId = teamId ? Number(teamId) : null;
  const { user, groups, isPending, clear } = useUser();
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);

  const logout = useCallback(() => {
    const flag = confirm('로그아웃 하시겠습니까?');
    if (flag) {
      clear();
      alert('로그아웃 되었습니다.');
    }
  }, [clear]);

  const dropdownItems = useMemo(
    () => [
      { text: '마이 히스토리', href: '/myhistory' },
      { text: '계정 설정', href: '/mypage' },
      { text: '팀 참여', href: '/jointeam' },
      {
        text: '로그아웃',
        onClick: logout,
      },
    ],
    [clear],
  );

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
    <header className="fixed z-40 flex w-full items-center border-b bg-b-secondary transition-all">
      <nav className="mx-auto flex h-pr-60 w-pr-1280 items-center justify-between px-pr-40 mo:px-pr-16 ta:px-pr-25">
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

          {deviceType !== 'mobile' && (
            <>
              {groups && (
                <NavigationGroupDropdown
                  groups={groups}
                  isPending={isPending}
                  currentGroup={currentGroup}
                />
              )}
              {user && (
                <Link href="/boards">
                  <Button variant="link">
                    <span className="text-16m">자유게시판</span>
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
        {user ? (
          <DropDown
            trigger={
              <Button variant="link">
                <Profile userName={user.nickname} profileImage={user.image} />
              </Button>
            }
            items={dropdownItems}
          />
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
