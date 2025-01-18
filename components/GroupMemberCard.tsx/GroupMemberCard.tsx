import Image from 'next/image';

import { IMember } from '@/types/group.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

interface GroupMemberCard {
  member: IMember;
}

export default function GroupMemberCard({ member }: GroupMemberCard) {
  const deviceType = useDeviceType();

  return (
    <div className="flex max-h-pr-73 max-w-pr-384 items-center gap-pr-12 rounded-pr-16 bg-b-secondary px-pr-24 py-pr-20 transition-all duration-300 mo:max-w-pr-160 mo:px-pr-16 mo:py-pr-12 ta:max-w-pr-216">
      {deviceType !== 'mobile' ? (
        <DefaultContent member={member} />
      ) : (
        <MobileContent member={member} />
      )}
      <Image
        className="rounded-full hover:bg-primary/10 active:bg-primary/20"
        width={24}
        height={24}
        src="/images/icon-kebab.svg"
        alt="프로필 옵션"
      />
    </div>
  );
}

interface ContentProps {
  member: IMember;
}

const defaultProfile = '/images/icon-profile-member-default.svg';

function DefaultContent({ member }: ContentProps) {
  return (
    <>
      <Avatar className="z-0 h-pr-32 w-pr-32">
        <AvatarImage src={member.userImage || defaultProfile} />
        <AvatarFallback>프로필</AvatarFallback>
      </Avatar>
      <div className="grow overflow-hidden">
        <p className="truncate text-14m text-primary">{member.userName}</p>
        <p className="truncate text-12 text-t-secondary">{member.userEmail}</p>
      </div>
    </>
  );
}

function MobileContent({ member }: ContentProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center gap-pr-8">
        <Avatar className="z-0 h-pr-24 w-pr-24">
          <AvatarImage src={member.userImage || defaultProfile} />
          <AvatarFallback>프로필</AvatarFallback>
        </Avatar>
        <p className="truncate text-14m text-primary">{member.userName}</p>
      </div>
      <p className="truncate text-12 text-t-secondary">{member.userEmail}</p>
    </div>
  );
}
