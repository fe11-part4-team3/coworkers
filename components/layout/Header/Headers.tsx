'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import getMockGroups from '@/components/SideNavigation/mockGroups';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';

import Logo from './Logo';
import Profile from './Profile';
import useUser from '@/hooks/useUser';

function Headers() {
  const { isAuthenticated, accessToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    console.log('인증상태', isAuthenticated);
    console.log('유저 정보', user);
    console.log('토큰', accessToken);
  }, [user]);

  return (
    <header className="fixed flex h-pr-60 w-full items-center border-b bg-b-secondary">
      <div className="mx-auto flex w-pr-1200 items-center gap-pr-40 px-pr-40 mo:px-pr-16 ta:gap-pr-24 ta:px-pr-25">
        <Logo />
        <nav className="ml-4 flex items-center space-x-4">
          <ul className="flex items-center space-x-4 text-16m">
            {/* TODO : 모바일일때는 안보이게 */}
            {user && user.memberships.length > 0 && (
              <li>
                <Link href={`/${user.memberships[0].groupId}`}>
                  <p>{user.memberships[0].groupId}</p>
                </Link>
                <Image
                  src="/images/img-Check.svg"
                  alt="check"
                  width={16}
                  height={16}
                />
              </li>
            )}
            {/*TODO 테스트용. 나중에 지워야합니다!*/}
            <li>
              <NavigationGroupDropdown groups={getMockGroups(10)} />
            </li>
            <li>
              <Link href="/boards">자유게시판</Link>
            </li>
          </ul>
        </nav>

        {user && (
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
