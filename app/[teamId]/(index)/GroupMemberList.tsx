import { useState } from 'react';

import { IMember, RoleType } from '@/types/group.type';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import Plus from '@/public/images/icon-plus.svg';
import { getInvitation } from '@/service/group.api';
import ArrowDown from '@/public/images/icon-arrow-down.svg';

import GroupMemberCard from './GroupMemberCard';
import useModalStore from '@/stores/modalStore';
import InviteMember from '@/components/modal/InviteMember';
import { useMutation } from '@tanstack/react-query';
import createUrlString from '@/utils/createUrlString';

interface GroupMemberListProps {
  role: RoleType;
  groupId: number;
  members: IMember[] | null;
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
}: GroupMemberListProps) {
  const deviceType = useDeviceType();
  const [more, setMore] = useState(false);
  const { openModal } = useModalStore();

  const { mutate: getInvitationMutate } = useMutation({
    mutationFn: () => getInvitation({ id: groupId }),
    onSuccess: (token) => {
      const path = createUrlString({
        origin: location.origin,
        pathname: ['/jointeam'],
        queryParams: { token },
      });
      navigator.clipboard.writeText(path);
      console.log(path);
    },
  });

  const handleClickInvitation = async () => {
    openModal(<InviteMember onClick={getInvitationMutate} />);
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
            <GroupMemberCard key={member.userId} role={role} member={member} />
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
