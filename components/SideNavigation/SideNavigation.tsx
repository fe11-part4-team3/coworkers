'use client';

import { usePathname, useRouter } from 'next/navigation';

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
 * STUB 사이드 네비게이션 최종 랜더링
 * @param props
 * @param props.groups 그룹 배열
 */
function SideNavigation({ groups }: SNBProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { toggleSidebar } = useSidebar();

  const handleClick = (path: string) => {
    toggleSidebar();
    router.push(path);
  };

  return (
    <div className="fixed left-0 top-0 z-10">
      <Sidebar className="border-none">
        <SidebarHeader className="items-end p-pr-16">
          <SideNavigationTrigger
            src="/images/icon-close.svg"
            alt="사이드 네비게이션 닫기"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SideNavGroupLabel toggleSidebar={toggleSidebar} />
            <SidebarGroupContent>
              <SidebarMenu className="gap-0">
                <SideNavTeamList
                  groups={groups}
                  handleClick={handleClick}
                  pathname={pathname}
                />
                <SideNavDefaultList
                  handleClick={handleClick}
                  pathname={pathname}
                />
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

export default SideNavigation;
