import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import Plus from '@/public/images/icon-plus.svg';

import { Button } from '../ui/button';

/**
 * 그룹 추가 버튼
 * TODO 그룹 추가 로직을 추가해야합니다.
 */
export default function DropdownAddGroup() {
  return (
    <DropdownMenuItem asChild>
      <Button className="mt-pr-16 w-full rounded-pr-8 border border-slate-50 bg-inherit">
        <Plus />
        <span className="text-white">팀 추가하기</span>
      </Button>
    </DropdownMenuItem>
  );
}
