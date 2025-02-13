import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import IconPlus from '@/public/images/icon-plus.svg';
import Buttons from '@/components/Buttons';
import useModalStore from '@/stores/modalStore';

import AddTeamModal from './AddTeamModal';

/**
 * 그룹 추가 버튼
 * TODO 그룹 추가 로직을 추가해야합니다.
 */
export default function DropdownAddGroup() {
  const { openModal } = useModalStore();

  const handleClick = () => openModal(<AddTeamModal />);

  return (
    <DropdownMenuItem asChild>
      <Buttons
        text="팀 추가하기"
        backgroundColor="none"
        border="default"
        onClick={handleClick}
        className="text-t-primary"
        icon={
          <IconPlus
            className="text-t-primary"
            height={17}
            width={17}
            stroke="#F8FAFC"
          />
        }
      />
    </DropdownMenuItem>
  );
}
