import { MouseEvent, useRef } from 'react';

import { IMember, RoleType } from '@/types/group.type';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import Profile from '@/components/Profile/Profile';
import useModalStore from '@/stores/modalStore';
import MemberProfile from '@/components/modal/MemberProfile';
import DropDown from '@/components/DropDown';

import { _DeleteMemberParams } from './TeamPage.type';
import DeleteMemberModal from './DeleteMemberModal';

interface GroupMemberCard {
  role: RoleType;
  member: IMember;
  onDelete: (params: _DeleteMemberParams) => void;
}

export default function GroupMemberCard({
  role,
  member,
  onDelete,
}: GroupMemberCard) {
  const deviceType = useDeviceType();
  const { openModal } = useModalStore();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickCard = (event: MouseEvent<HTMLDivElement>) => {
    if (dropdownRef.current?.contains(event.target as Node)) {
      return;
    }
    openModal(<MemberProfile member={member} />);
  };

  const handleClickDelete = () => {
    openModal(
      <DeleteMemberModal
        onDelete={() => onDelete({ memberUserId: member.userId })}
      />,
    );
  };

  return (
    <div
      onClick={handleClickCard}
      className="relative flex max-h-pr-73 cursor-pointer items-center gap-pr-12 rounded-pr-16 bg-b-secondary px-pr-24 py-pr-20 transition-all duration-300 hover:scale-105 hover:drop-shadow-lg mo:px-pr-16 mo:py-pr-12"
    >
      {deviceType !== 'mobile' ? (
        <DefaultContent member={member} />
      ) : (
        <MobileContent member={member} />
      )}
      {role === 'ADMIN' && (
        <div className="size-pr-16">
          <DropDown
            ref={dropdownRef}
            trigger={<button className="icon-kebab absolute" />}
            items={[{ text: '추방하기', onClick: handleClickDelete }]}
            width="w-pr-120"
          />
        </div>
      )}
    </div>
  );
}

interface ContentProps {
  member: IMember;
}

const NAME_CLASSNAME = 'truncate text-14m text-t-primary';
const EMAIL_CLASSNME = 'truncate text-12 text-t-secondary';

function DefaultContent({ member }: ContentProps) {
  return (
    <>
      <Profile variant="member" image={member.userImage} profileSize={32} />
      <div className="grow overflow-hidden text-t-primary">
        <p className={NAME_CLASSNAME}>{member.userName}</p>
        <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
      </div>
    </>
  );
}

function MobileContent({ member }: ContentProps) {
  return (
    <div className="flex grow flex-col overflow-hidden">
      <div className="flex items-center gap-pr-8">
        <Profile variant="member" image={member.userImage} profileSize={24} />
        <p className={NAME_CLASSNAME}>{member.userName}</p>
      </div>
      <p className={EMAIL_CLASSNME}>{member.userEmail}</p>
    </div>
  );
}
