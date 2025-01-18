'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import Profile from './Profile';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [profileImage, setProfileImage] = useState<
    string | undefined
  >(undefined);

  const handleTestImageChange = () => {
    setProfileImage('/images/codeitprofile.png');
  };

  return (
    <div>
      <nav className="flex items-center justify-between bg-[#003366] px-4 py-2 text-white">
        <Logo />

        <div className="ml-4 flex items-center space-x-4">
          {isLoggedIn && (
            <>
              {teamName && (
                <span className="text-sm">
                  {teamName} ▾
                </span>
              )}
              <span className="text-sm">자유게시판</span>
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
};

export default Header;
