import { useState } from 'react';

import { IMember, RoleType } from '@/types/group.type';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import Plus from '@/public/images/icon-plus.svg';
import ArrowDown from '@/public/images/icon-arrow-down.svg';
import useModalStore from '@/stores/modalStore';

import GroupMemberCard from './GroupMemberCard';
import { _DeleteMemberParams } from './TeamPage.type';
import InviteMemberModal from './InviteMemberModal';

interface GroupMemberListProps {
  role: RoleType;
  groupId: number;
  members: IMember[] | null;
  onDelete: (params: _DeleteMemberParams) => void;
}

const SIZE = {
  desktop: 6,
  tablet: 6,
  mobile: 4,
};

const GRID_COLRS = {
  desktop: 'grid-cols-3',
  tablet: 'grid-cols-3',
  mobile: 'grid-cols-2',
};

export default function GroupMemberList({
  role,
  groupId,
  members,
  onDelete,
}: GroupMemberListProps) {
  const deviceType = useDeviceType();
  const [more, setMore] = useState(false);
  const { openModal } = useModalStore();

  //TODO 데이터가 있을 때 중복 요청 안보내게 개선

  const handleClickInvitation = async () => {
    openModal(<InviteMemberModal />);
  };

  if (!members) return null;

  return (
    <div className="flex flex-col gap-pr-24">
      <div className="flex">
        <div className="grow">
          <span className="text-16m text-t-primary">멤버</span>
          <span className="text-16m text-t-default">
            &nbsp;({members.length}명)
          </span>
        </div>
        {role === 'ADMIN' && (
          <button
            className="flex bg-inherit text-brand-primary underline-offset-2 hover:underline"
            onClick={handleClickInvitation}
          >
            <Plus width={17} height={17} />
            <span className="text-14">새로운 멤버 초대하기</span>
          </button>
        )}
      </div>

      <div
        className={`grid gap-pr-24 ${GRID_COLRS[deviceType]} transition-all`}
      >
        {members?.map((member, i) =>
          more || SIZE[deviceType] > i ? (
            <GroupMemberCard
              key={member.userId}
              role={role}
              member={member}
              onDelete={onDelete}
            />
          ) : null,
        )}
      </div>

      {members.length > SIZE[deviceType] && (
        <button
          className="m-auto flex w-fit items-center underline-offset-4 hover:underline"
          onClick={() => setMore((prev) => !prev)}
        >
          <ArrowDown className={more ? 'rotate-180' : ''} />
          <span>{more ? '간략히' : '더보기'}</span>
        </button>
      )}
    </div>
  );
}
