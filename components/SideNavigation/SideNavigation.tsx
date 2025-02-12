'use client';

import { useRouter } from 'next/navigation';

import { IGroup } from '@/types/group.type';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from '../ui/sidebar';
import GroupList from './GroupList';
import SideNavigationTrigger from './SideNavigationTrigger';

interface SNBProps {
  isPending: boolean;
  groups: IGroup[] | null;
  showSkeleton?: boolean;
  skeletonLength?: number;
}

/**
 * 사이드 네비게이션
 * @param props
 * @param props.groups 그룹 배열
 * @param props.loading groups 로딩 여부
 * @param props.showSkeleton 로딩 시 스켈레톤 표기 여부
 * @param props.skeletonLength 표기 스켈레톤 요소 수
 */
export default function SideNavigation({
  isPending,
  groups,
  showSkeleton,
  skeletonLength,
}: SNBProps) {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleClick = (path: string) => {
    toggleSidebar();
    router.push(path);
  };

  return (
    <div className="fixed left-0 top-0 z-10">
      <Sidebar className="border-none">
        <SidebarHeader className="items-end">
          <SideNavigationTrigger
            src="images/icon-close.svg"
            alt="사이드 네비게이션 닫기"
          />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>그룹</SidebarGroupLabel>
            <SidebarGroupContent>
              <GroupList
                groups={groups}
                isPending={isPending}
                showSkeleton={showSkeleton}
                skeletonLength={skeletonLength}
                onClick={handleClick}
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>네비게이션</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-pr-24">
                <SidebarMenuButton
                  className="text-14m"
                  onClick={() => handleClick('/boards')}
                >
                  <span>자유게시판</span>
                </SidebarMenuButton>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}
