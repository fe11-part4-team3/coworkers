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

// NOTE GroupMemberCard와 타입이 동일하지만 의미론적으로 분리했습니다.
interface ContentProps {
  member: IMember;
}

const DEFAULT_PROFILE = '/images/icon-profile-member.svg';
const NAME_CLASSNAME = 'truncate text-14m text-t-primary';
const EMAIL_CLASSNME = 'truncate text-12 text-t-secondary';
//NOTE className에 직접 넣으니 h랑 w가 size로 병합되어 따로 상수로 만들었습니다.
const AVATAR_CALSSNAME = 'z-0 h-pr-32 w-pr-32';

function DefaultContent({ member }: ContentProps) {
  return (
    <>
      <Avatar className={AVATAR_CALSSNAME}>
        <AvatarImage src={member.userImage || DEFAULT_PROFILE} />
        <AvatarFallback>프로필</AvatarFallback>
      </Avatar>
      <div className="grow overflow-hidden text-t-primary">
        <p className={NAME_CLASSNAME}>{member.userName}</p>
        <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
      </div>
    </>
  );
}

function MobileContent({ member }: ContentProps) {
  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex items-center gap-pr-8">
        <Avatar className="z-0 size-pr-24">
          <AvatarImage src={member.userImage || DEFAULT_PROFILE} />
          <AvatarFallback>프로필</AvatarFallback>
        </Avatar>
        <p className={NAME_CLASSNAME}>{member.userName}</p>
      </div>
      <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
    </div>
  );
}
