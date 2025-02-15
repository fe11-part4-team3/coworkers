import useModalStore from '@/stores/modalStore';
import IconPlus from '@/public/images/icon-plus.svg';

import AddTeamModal from '../NavigationGroupDropdown/AddTeamModal';
import { SidebarGroupLabel } from '../ui/sidebar';

/**
 * STUB 사이드 네비게이션 그룹 라벨
 * @param props
 * @param props.toggleSidebar 사이드 네비게이션 닫기
 */
function SideNavGroupLabel({ toggleSidebar }: { toggleSidebar: () => void }) {
  const { openModal } = useModalStore();

  const handleAddTeamClick = () => {
    toggleSidebar();
    openModal(<AddTeamModal />);
  };

  return (
    <SidebarGroupLabel className="flex items-center justify-between">
      <span>소속된 팀</span>
      <button
        className="rounded-full p-pr-5 text-14m transition-all duration-300 hover:bg-b-primary"
        onClick={handleAddTeamClick}
      >
        <IconPlus width={16} height={16} strokeWidth={2} stroke="#F8FAFC" />
      </button>
    </SidebarGroupLabel>
  );
}

export default SideNavGroupLabel;
