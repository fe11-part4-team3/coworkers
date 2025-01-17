import React from 'react';
import Image from 'next/image';

interface ProfileProps {
  userName: string;
  profileImage?: string;
}

const Profile: React.FC<ProfileProps> = ({
  userName,
  profileImage,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src={profileImage || '/images/img-BasicProfile.png'}
        alt="프로필 사진"
        className="h-8 w-8 rounded-full"
        width={16}
        height={16}
      />
      <span className="text-sm text-white">{userName}</span>
    </div>
  );
};

export default Profile;
