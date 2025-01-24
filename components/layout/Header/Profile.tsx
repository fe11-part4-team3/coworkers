import React from 'react';
import Image from 'next/image';

import BasicProfile from '@/public/images/img-BasicProfile.svg';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

interface ProfileProps {
  userName: string;
  profileImage?: string | null;
}

const Profile: React.FC<ProfileProps> = ({ userName, profileImage }) => {
  const deviceType = useDeviceType();

  return (
    <div className="flex items-center space-x-2">
      {profileImage ? (
        <Image
          src={profileImage}
          alt="프로필 사진"
          className="size-pr-16 rounded-full"
          width={16}
          height={16}
        />
      ) : (
        <BasicProfile />
      )}

      {deviceType === 'desktop' && <span className="text-14m">{userName}</span>}
    </div>
  );
};

export default Profile;
