'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { useQueryClient } from '@tanstack/react-query';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { Button } from '@/components/ui/button';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import SideNavigation from '@/components/SideNavigation/SideNavigation';
import useUser from '@/hooks/useUser';
import DropDown from '@/components/DropDown';
import { removeLoginProcessed } from '@/lib/kakaoStorage';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useGroup from '@/hooks/useGroup';
import Logout from '@/components/modal/Logout';
import useModalStore from '@/stores/modalStore';
import DarkmodeToggle from '@/components/DarkmodeToggle';

import Logo from './Logo';
import Profile from './Profile';

function Headers() {
  const queryClient = useQueryClient();
  const deviceType = useDeviceType();
  const { user, groups, isPending, clear: clearUser } = useUser();
  const { group, clear: clearGroup } = useGroup();
  const { showSnackbar } = useSnackbar();
  const { openModal } = useModalStore();

  const logout = () => {
    clearUser();
    clearGroup();

    queryClient.removeQueries({ queryKey: ['user'] });
    queryClient.removeQueries({ queryKey: ['group'] });
    queryClient.removeQueries({ queryKey: ['tasks'] });
    queryClient.removeQueries({ queryKey: ['taskList'] });

    // STUB 세션 로그아웃
    signOut({ redirect: false });
    removeLoginProcessed();

    showSnackbar('로그아웃 되었습니다.');
  };

  const handleClickLogout = () => {
    openModal(<Logout onClick={logout} />);
  };

  const dropdownItems = useMemo(
    () => [
      { text: '마이 히스토리', href: '/myhistory' },
      { text: '계정 설정', href: '/mypage' },
      { text: '팀 참여', href: '/jointeam' },
      {
        text: '로그아웃',
        onClick: handleClickLogout,
      },
    ],
    [logout],
  );

  return (
    <header className="fixed z-40 flex w-full items-center border-b bg-b-secondary transition-all">
      <nav className="mx-auto flex h-pr-60 w-pr-1280 items-center justify-between px-pr-40 mo:px-pr-16 ta:px-pr-25">
        <div className="flex items-center gap-pr-40 ta:gap-pr-24">
          {deviceType === 'mobile' && (
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
                  currentGroup={group}
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
        <div className="flex items-center gap-pr-10">
          <DarkmodeToggle />
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
        </div>
      </nav>
    </header>
  );
}

export default Headers;
