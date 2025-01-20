'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useAuth } from '@/hooks/useAuth';
import useUserStore from '@/stores/useUser.store';
import { Button } from '@/components/ui/button';

import Logo from './Logo';
import Profile from './Profile';

function Headers() {
  const [teamId, setTeamId] = useState<string | null>('');
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  // TODO : 팀 아이디를 가져오는 로직이 필요합니다.
  useEffect(() => {
    setTeamId('경영지원팀');
  }, []);

  return (
    <header className="fixed flex h-pr-60 w-full items-center border-b bg-b-secondary">
      <div className="mx-auto flex w-pr-1200 items-center gap-pr-40 px-pr-40 mo:px-pr-16 ta:gap-pr-24 ta:px-pr-25">
        <Logo />
        <nav className="ml-4 flex items-center space-x-4">
          <ul className="flex items-center space-x-4 text-16m">
            {/* TODO : 모바일일때는 안보이게 */}
            {isAuthenticated && user && user.memberships.length > 0 && (
              <li>
                <Link href={`/${teamId}`}>
                  <p>{teamId}</p>
                </Link>
                <Image
                  src="/images/img-Check.svg"
                  alt="check"
                  width={16}
                  height={16}
                />
              </li>
            )}

            <li>
              <Link href="/board">자유게시판</Link>
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
