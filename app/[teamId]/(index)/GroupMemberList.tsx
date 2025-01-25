import { useState } from 'react';

import { IMember } from '@/types/group.type';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import Plus from '@/public/images/icon-plus.svg';
import { getInvitation } from '@/service/group.api';
import ArrowDown from '@/public/images/icon-arrow-down.svg';

import GroupMemberCard from './GroupMemberCard';

interface GroupMemberListProps {
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
  groupId,
  members,
}: GroupMemberListProps) {
  const deviceType = useDeviceType();
  const [more, setMore] = useState(false);

  //TODO 공용 모달 완성되면 모달로 alert 띄우기
  //TODO 초대 관련 로직 구현하기
  const handleClickInvitation = async () => {
    try {
      const response = await getInvitation({ id: groupId });
      navigator.clipboard.writeText(response);
      alert(response);
    } catch (error) {
      console.error(error);
      alert('초대 토큰 생성 실패');
    }
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
        <button
          className="flex bg-inherit text-brand-primary underline-offset-2 hover:underline"
          onClick={handleClickInvitation}
        >
          <Plus width={17} height={17} />
          <span className="text-14">새로운 멤버 초대하기</span>
        </button>
      </div>

      <div
        className={`grid gap-pr-24 ${GRID_COLRS[deviceType]} transition-all`}
      >
        {members?.map((member, i) =>
          more || SIZE[deviceType] > i ? (
            <GroupMemberCard key={member.userId} member={member} />
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
