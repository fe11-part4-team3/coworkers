'use client';

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
import { IGroup } from '@/types/group.type';
import GroupList from './GroupList';
import { useRouter } from 'next/navigation';

interface SNBProps {
  loading?: boolean | undefined;
  groups?: IGroup[] | undefined;
  showSkeleton?: boolean | undefined;
  skeletonLength?: number | undefined;
}

export default function SideNavigationBar({
  loading,
  groups,
  showSkeleton,
  skeletonLength,
}: SNBProps) {
  const router = useRouter();

  return (
    <div className="fixed left-0 top-0">
      <Sidebar className="border-none">
        <SidebarHeader className="items-end"></SidebarHeader>
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
            <SidebarGroupLabel>
              네비게이션
            </SidebarGroupLabel>
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
