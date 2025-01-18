import { IMember } from '@/types/group.type';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Image from 'next/image';

interface GroupMemberCard {
  member: IMember;
}

const defaultProfile = '/images/icon-profile-member-default.svg';

export default function GroupMemberCard({ member }: GroupMemberCard) {
  return (
    <div className="flex max-h-pr-73 max-w-pr-384 items-center gap-pr-12 rounded-pr-16 bg-b-secondary px-pr-24 py-pr-20">
      <Avatar className="z-0 h-pr-32 w-pr-32">
        <AvatarImage src={member.userImage || defaultProfile} />
        <AvatarFallback>프로필</AvatarFallback>
      </Avatar>
      <div className="grow">
        <p className="text-14m text-primary">{member.userName}</p>
        <p className="text-12 text-t-secondary">{member.userEmail}</p>
      </div>
      <Image
        width={16}
        height={16}
        src="/images/icon-kebab.svg"
        alt="프로필 옵션"
      />
    </div>
  );
}
