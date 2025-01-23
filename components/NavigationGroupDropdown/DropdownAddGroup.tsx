import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import IconPlus from '@/public/images/icon-plus.svg';

/**
 * 그룹 추가 버튼
 * TODO 그룹 추가 로직을 추가해야합니다.
 */
export default function DropdownAddGroup() {
  return (
    <DropdownMenuItem asChild>
      <Button className="mt-pr-16 w-full rounded-lg border border-slate-50 bg-inherit">
        <IconPlus className="text-t-primary" />
        <span className="text-t-primary">팀 추가하기</span>
      </Button>
    </DropdownMenuItem>
  );
}
