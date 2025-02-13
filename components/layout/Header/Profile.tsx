import React from 'react';
import Image from 'next/image';

import BasicProfile from '@/public/images/img-BasicProfile.svg';

interface ProfileProps {
  userName: string;
  profileImage?: string | null;
}

const Profile: React.FC<ProfileProps> = ({ userName, profileImage }) => {
  return (
    <div className="flex items-center space-x-2">
      {profileImage ? (
        <Image
          src={profileImage}
          alt="프로필 사진"
          className="size-pr-20 rounded-full"
          width={20}
          height={20}
        />
      ) : (
        <BasicProfile />
      )}

      <span className="text-14m tamo:hidden">{userName}</span>
    </div>
  );
};

export default Profile;
