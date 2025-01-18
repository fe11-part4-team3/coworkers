'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import Profile from './Profile';
import Image from 'next/image';

function Headers() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [profileImage, setProfileImage] = useState<
    string | undefined
  >(undefined);

  return (
    <div>
      <nav className="flex items-center justify-between bg-[#003366] px-4 py-2 text-white">
        <Logo />

        <div className="ml-4 flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {teamName && (
                <span className="text-16m">
                  {teamName}{' '}
                  <Image
                    src="/images/img-Check.svg"
                    alt="check"
                    width={16}
                    height={16}
                  />
                </span>
              )}
              <span className="text-">자유게시판</span>
            </>
          )}
        </div>

        {isLoggedIn && (
          <div className="ml-auto">
            <Profile
              userName="안해나"
              profileImage={profileImage}
            />
          </div>
        )}
      </nav>
    </div>
  );
}

export default Headers;
