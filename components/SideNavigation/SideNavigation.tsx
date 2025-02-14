'use client';

import { useRouter } from 'next/navigation';

import { IGroup } from '@/types/group.type';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '../ui/sidebar';
import SideNavigationTrigger from './SideNavigationTrigger';
import SideNavGroupLabel from './SideNavGroupLabel';
import SideNavTeamList from './SideNavTeamList';
import SideNavDefaultList from './SideNavDefaultList';

interface SNBProps {
  isPending: boolean;
  groups: IGroup[] | null;
  showSkeleton?: boolean;
  skeletonLength?: number;
}

/**
 * STUB 사이드 네비게이션 컴포넌트 커스텀
 * @description 사이드 네비게이션 컴포넌트를 shadcn 컴포넌트와 구분을 위해 사용
 */
const Custom = {
  SideNavGroupLabel: ({ toggleSidebar }: { toggleSidebar: () => void }) => (
    <SideNavGroupLabel toggleSidebar={toggleSidebar} />
  ),
  SideNavTeamList: ({
    groups,
    handleClick,
  }: {
    groups: IGroup[] | null;
    handleClick: (path: string) => void;
  }) => <SideNavTeamList groups={groups} handleClick={handleClick} />,
  SideNavDefaultList: ({
    handleClick,
  }: {
    handleClick: (path: string) => void;
  }) => <SideNavDefaultList handleClick={handleClick} />,
  SideNavigationTrigger: ({ src, alt }: { src: string; alt: string }) => (
    <SideNavigationTrigger src={src} alt={alt} />
  ),
};

/**
 * STUB 사이드 네비게이션 최종 랜더링
 * @param props
 * @param props.groups 그룹 배열
 */
function SideNavigation({ groups }: SNBProps) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleClick = (path: string) => {
    toggleSidebar();
    router.push(path);
  };

  return (
    <div className="fixed left-0 top-0 z-10">
      <Sidebar className="border-none">
        <SidebarHeader className="items-end p-pr-16">
          <Custom.SideNavigationTrigger
            src="images/icon-close.svg"
            alt="사이드 네비게이션 닫기"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Custom.SideNavGroupLabel toggleSidebar={toggleSidebar} />
            <SidebarGroupContent>
              <SidebarMenu>
                <Custom.SideNavTeamList
                  groups={groups}
                  handleClick={handleClick}
                />
                <Custom.SideNavDefaultList handleClick={handleClick} />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default SideNavigation;
