import { useRouter } from 'next/navigation';
import Image from 'next/image';

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

const DEFAULT_GROUP_PROFILE = '/images/icon-image-default.svg';

interface NavigationGroupDropdownProps {
  groups: IGroup[] | null;
  isPending: boolean;
  currentGroup: IGroup | null;
}

/**
 * SECTION 글로벌 네비게이션에 사용할 그룹 드롭다운
 * @param props.groups 드롭다운에 사용할 그룹 배열
 * @param props.isPending 그룹 데이터 페칭 로딩 여부
 */
export default function NavigationGroupDropdown({
  groups,
  isPending,
  currentGroup,
}: NavigationGroupDropdownProps) {
  const router = useRouter();

  const handleClick = (groupId: number) => router.push(`/${groupId}`);

  if (!groups) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="bg-inherit text-t-primary">
          {/* TODO 펜딩 시 스피너 렌더링 해야함 */}
          {isPending && <span className="text-16m">로딩 중</span>}
          {!isPending && !currentGroup && (
            <span className="text-16m">팀 선택</span>
          )}
          {!isPending && currentGroup && (
            <>
              <div className="relative size-pr-24 overflow-hidden rounded-pr-6">
                <Image
                  fill
                  className="object-cover"
                  src={currentGroup.image || DEFAULT_GROUP_PROFILE}
                  alt="프로필 옵션"
                />
              </div>
              <span className="text-16m">{currentGroup.name}</span>
            </>
          )}

          <ArrowDwon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mt-pr-16 w-pr-218 rounded-pr-12 border-none bg-b-secondary p-pr-16">
        <div className="mb-pr-16 flex flex-col gap-pr-8">
          {groups.map((group) => (
            <DropdownTab key={group.id} group={group} onClick={handleClick} />
          ))}
        </div>

        <DropdownAddGroup />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
