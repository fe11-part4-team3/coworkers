import { IGroup } from '@/types/group.type';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar';
import Link from 'next/link';

interface GroupListProps {
  groups: IGroup[] | undefined;
  loading: boolean | undefined;
  showSkeleton?: boolean | undefined;
  skeletonLength?: number | undefined;
}

const DEFAULT_GROUPS: IGroup[] = [];

export default function GroupList({
  groups = DEFAULT_GROUPS,
  loading,
  showSkeleton,
  skeletonLength,
}: GroupListProps) {
  if (loading && showSkeleton) {
    return (
      <GroupListSkeleton skeletonLength={skeletonLength} />
    );
  }

  return (
    <SidebarMenu className="gap-pr-24">
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

interface GroupListSKeletonProps {
  skeletonLength?: number | undefined;
}

const DEFAULT_SKELETON_LENGTH = 5;

function GroupListSkeleton({
  skeletonLength = DEFAULT_SKELETON_LENGTH,
}: GroupListSKeletonProps) {
  return (
    <SidebarMenu className="gap-pr-24">
      {Array.from({ length: skeletonLength }).map(
        (_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ),
      )}
    </SidebarMenu>
  );
}
