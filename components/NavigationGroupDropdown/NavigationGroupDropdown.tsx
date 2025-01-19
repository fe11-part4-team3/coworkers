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
        <Button className="">{selected}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="border-none">
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

/**
 * SECTION 드롭다운 아이템 컴포넌트
 * @param props.group 표기 그룹
 * @param props.onClick 리다이렉트 핸들러
 */
function Item({ group, onClick }: ItemProps) {
  const handleClick = () => onClick(group.id);

  return (
    <DropdownMenuItem onClick={handleClick}>
      <span className="grow">{group.name}</span>
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
