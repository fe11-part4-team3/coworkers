import { IGroup } from '@/types/group.type';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '../ui/sidebar';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

  if (loading && showSkeleton) {
    return (
      <GroupListSkeleton skeletonLength={skeletonLength} />
    );
  }

  return (
    <SidebarMenu className="gap-pr-24">
      {groups.map((group) => (
        <SidebarMenuButton
          key={group.id}
          onClick={() => router.push(`/${group.id}`)}
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
