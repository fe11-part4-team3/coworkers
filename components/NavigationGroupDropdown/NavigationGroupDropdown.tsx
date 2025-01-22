import { useRouter } from 'next/navigation';

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
  groups: IGroup[] | undefined;
  isPending: boolean;
  selected: string | null;
}

/**
 * SECTION 글로벌 네비게이션에 사용할 그룹 드롭다운
 * @param props.groups 드롭다운에 사용할 그룹 배열
 * @param props.isPending 그룹 데이터 페칭 로딩 여부
 */
export default function NavigationGroupDropdown({
  groups,
  isPending,
  selected,
}: NavigationGroupDropdownProps) {
  const router = useRouter();

  const handleClick = (groupId: number) => router.push(`/${groupId}`);

  if (!groups) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* SECTION 트리거. 선택된 그룹 표기 */}
        <Button variant="link" className="bg-inherit text-t-primary">
          {/* TODO 펜딩 시 스피너 렌더링 해야함 */}
          {isPending ? (
            <span>로딩 중</span>
          ) : (
            <span className="text-16m">{selected || '팀 선택'}</span>
          )}
          {/* REVIEW 시안에는 없지만 화살표 색도 테마에 따라 변하면 좋겠음*/}
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
