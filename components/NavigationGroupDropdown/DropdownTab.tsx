import Image from 'next/image';

import { IGroup } from '@/types/group.type';
import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

interface DropdownTabProps {
  group: IGroup;
  onClick: (groupId: number) => void;
}

const DEFAULT_GROUP_PROFILE = '/images/icon-image-default.svg';

/**
 * SECTION 드롭다운 아이템 컴포넌트
 * TODO 프로필 이미지 디자인  해야합니다.
 * @param props.group 표기 그룹
 * @param props.onClick 리다이렉트 핸들러
 */
export default function DropdownTab({ group, onClick }: DropdownTabProps) {
  const handleClick = () => onClick(group.id);

  return (
    <DropdownMenuItem
      className="mb-pr-8 rounded-pr-8 px-pr-8 py-pr-7"
      onClick={handleClick}
    >
      <Image
        width={24}
        height={24}
        src={group.image || DEFAULT_GROUP_PROFILE}
        alt="프로필 옵션"
      />
      <span className="grow text-16m text-white">{group.name}</span>
      <Image
        className="rounded-full transition-all duration-300 hover:bg-primary/10 active:bg-primary/20"
        width={24}
        height={24}
        src="/images/icon-kebab.svg"
        alt="프로필 옵션"
      />
    </DropdownMenuItem>
  );
}
