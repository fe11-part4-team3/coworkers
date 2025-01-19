import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '../ui/button';
import { IGroup } from '@/types/group.type';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import ArrowDwon from '@/public/images/icon-arrow-down.svg';

interface NavigationGroupDropdownProps {
  groups: IGroup[];
}

/**
 * SECTION 글로벌 네비게이션에 사용할 그룹 드롭다운
 * @param props.groups 드롭다운에 사용할 그룹 배열
 */
export default function NavigationGroupDropdown({
  groups,
}: NavigationGroupDropdownProps) {
  const router = useRouter();
  const { teamId } = useParams();
  const groupId = teamId ? Number(teamId) : null;
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (groupId: number) => router.push(`/${groupId}`);

  useEffect(() => {
    if (!groupId || !groups) return;

    //SECTION 드롭다운 선택된 그룹 찾는 로직
    groups.some((group) => {
      if (group.id === groupId) {
        setSelected(group.name);
        return true;
      }
      return false;
    });
  }, [groupId, groups]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-inherit text-16m text-primary hover:bg-primary/10">
          <span>{selected}</span>
          <ArrowDwon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-pr-12 border-none bg-b-secondary p-pr-16">
        {groups.map((group) => (
          <Item key={group.id} group={group} onClick={handleClick} />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ItemProps {
  group: IGroup;
  onClick: (groupId: number) => void;
}

const DEFAULT_GROUP_PROFILE = '/images/icon-image-default.svg';

/**
 * SECTION 드롭다운 아이템 컴포넌트
 * @param props.group 표기 그룹
 * @param props.onClick 리다이렉트 핸들러
 */
function Item({ group, onClick }: ItemProps) {
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
