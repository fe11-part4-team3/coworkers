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
} from '../ui/sidebar';
import GroupList from './GroupList';
import SideNavigationTrigger from './SideNavigationTrigger';

interface SNBProps {
  loading?: boolean | undefined;
  groups?: IGroup[] | undefined;
  showSkeleton?: boolean | undefined;
  skeletonLength?: number | undefined;
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
  loading,
  groups,
  showSkeleton,
  skeletonLength,
}: SNBProps) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0">
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
                loading={loading}
                showSkeleton={showSkeleton}
                skeletonLength={skeletonLength}
              />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>네비게이션</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="gap-pr-24">
                <SidebarMenuButton
                  className="text-14m"
                  onClick={() => router.push('/boards')}
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
