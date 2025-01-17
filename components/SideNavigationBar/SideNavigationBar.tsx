'use client';

import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '../ui/sidebar';
import { IGroup } from '@/types/group.type';

interface SNBProps {
  groups: IGroup[];
}

export default function SideNavigationBar({
  groups,
}: SNBProps) {
  return (
    <div className="fixed left-0 top-0">
      <Sidebar className="border-none">
        <SidebarHeader className="items-end"></SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>그룹</SidebarGroupLabel>
            <SidebarGroupContent>
              <GroupContent groups={groups} />
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>기타</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <Link href="/boards">
                    <span className="text-14m">
                      자유게시판
                    </span>
                  </Link>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </div>
  );
}

function GroupContent({ groups }: { groups: IGroup[] }) {
  return (
    <SidebarMenu>
      {groups.map((group) => (
        <SidebarMenuItem key={group.id}>
          <SidebarMenuItem>
            <Link href={`/${group.id}`}>
              <span className="text-14m">{group.name}</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
