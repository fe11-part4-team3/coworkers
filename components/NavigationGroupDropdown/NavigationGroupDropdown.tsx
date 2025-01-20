import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { IGroup } from '@/types/group.type';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import ArrowDwon from '@/public/images/icon-arrow-down.svg';

import { Button } from '../ui/button';
import DropdownTab from './DropdownTab';
import DropdownAddGroup from './DropdownAddGroup';

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
        {/* SECTION 트리거. 선택된 그룹 표기 */}
        <Button className="bg-inherit text-16m text-t-primary hover:bg-primary/10">
          <span>{selected}</span>
          <ArrowDwon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-pr-16 rounded-pr-12 border-none bg-b-secondary p-pr-16">
        {/* SECTION 드롭다운 그룹 리스트 */}
        {groups.map((group) => (
          <DropdownTab key={group.id} group={group} onClick={handleClick} />
        ))}
        {/* SECTION 팀 추가하기 버튼 */}
        <DropdownAddGroup />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
