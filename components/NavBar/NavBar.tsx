'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import Profile from './Profile';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [profileImage, setProfileImage] = useState<
    string | undefined
  >(undefined);

  const handleTestImageChange = () => {
    // 테스트용 임의의 이미지 URL
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
      상태 변경 버튼들 (테스트용)
      <div className="mt-4 flex space-x-2">
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setIsLoggedIn(false)}
        >
          로그아웃
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            setIsLoggedIn(true);
            setTeamName('');
          }}
        >
          로그인 (팀 미가입)
        </button>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => {
            setIsLoggedIn(true);
            setTeamName('경영관리팀');
          }}
        >
          로그인 (팀 가입)
        </button>

        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={handleTestImageChange}
        >
          테스트 이미지로 변경
        </button>
      </div>
    </div>
  );
};

export default Navbar;
