import { IGroup } from '@/types/group.type';

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar';

interface GroupListProps {
  groups: IGroup[] | null;
  isPending: boolean;
  showSkeleton?: boolean;
  skeletonLength?: number;
  onClick: (path: string) => void;
}

export default function GroupList({
  groups,
  isPending,
  showSkeleton,
  skeletonLength,
  onClick,
}: GroupListProps) {
  if (isPending && showSkeleton) {
    return <GroupListSkeleton skeletonLength={skeletonLength} />;
  }

  return (
    <SidebarMenu className="gap-pr-12">
      {groups &&
        groups.map((group) => (
          <SidebarMenuButton
            key={group.id}
            onClick={() => onClick(`/${group.id}`)}
          >
            <span className="text-14m">{group.name}</span>
          </SidebarMenuButton>
        ))}
    </SidebarMenu>
  );
}

interface GroupListSKeletonProps {
  skeletonLength?: number | undefined;
}

const DEFAULT_SKELETON_LENGTH = 5;

function GroupListSkeleton({
  skeletonLength = DEFAULT_SKELETON_LENGTH,
}: GroupListSKeletonProps) {
  return (
    <SidebarMenu className="gap-pr-24">
      {Array.from({ length: skeletonLength }).map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton showIcon />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
