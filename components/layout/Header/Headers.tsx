'use client';

import Link from 'next/link';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { useAuth } from '@/hooks/useAuth';
import useUserStore from '@/stores/useUser.store';
import { Button } from '@/components/ui/button';

import Logo from './Logo';
import Profile from './Profile';
import { useQuery } from '@tanstack/react-query';
import { getGroupList } from '@/service/user.api';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

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
    <header className="fixed flex h-pr-60 w-full items-center border-b bg-b-secondary">
      <div className="mx-auto flex w-pr-1200 items-center gap-pr-40 px-pr-40 mo:px-pr-16 ta:gap-pr-24 ta:px-pr-25">
        <Logo />
        <nav className="ml-4 flex items-center space-x-4">
          <ul className="flex items-center space-x-4 text-16m">
            <li>
              <NavigationGroupDropdown
                groups={groups}
                visible={deviceType !== 'mobile'}
              />
            </li>
            <li>
              <Link href="/boards">자유게시판</Link>
            </li>
          </ul>
        </nav>

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
