'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Logo from './Logo';
import Profile from './Profile';

function Headers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamId, setTeamId] = useState<string | null>('');
  const [profileImage, setProfileImage] = useState<string | undefined>(
    undefined,
  );

  // TODO : 팀 아이디를 가져오는 로직이 필요합니다.
  useEffect(() => {
    setTeamId('경영지원팀');
    setIsLoggedIn(false);
    setProfileImage('/images/img-Profile.svg');
  }, []);

  return (
    <header className="align-center border-bottom fixed flex h-pr-60 w-full bg-b-secondary">
      <div className="align-center mx-auto flex w-pr-1200 gap-pr-40 px-pr-40 mo:px-pr-16 ta:gap-pr-24 ta:px-pr-25">
        <Logo />
        <nav className="ml-4 flex items-center space-x-4">
          <ul className="flex items-center space-x-4 text-16m">
            {/* TODO : 모바일일때는 안보이게 */}
            {isLoggedIn && teamId && (
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

        {isLoggedIn && (
          <Profile userName="안해나" profileImage={profileImage} />
        )}
      </div>
    </header>
  );
}

export default Headers;
