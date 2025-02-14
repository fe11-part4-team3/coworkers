import { IGroup } from '@/types/group.type';

import { SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

/**
 * STUB 사이드 네비게이션 팀 리스트
 * @param props
 * @param props.groups 그룹 배열
 * @param props.handleClick 클릭 이벤트 핸들러
 */
function SideNavTeamList({
  groups,
  handleClick,
}: {
  groups: IGroup[] | null;
  handleClick: (path: string) => void;
}) {
  return (
    <>
      {groups ? (
        groups.map((group) => (
          <SidebarMenuItem key={group.id}>
            <SidebarMenuButton
              key={group.id}
              onClick={() => handleClick(`/${group.id}`)}
              className="my-pr-12 py-pr-4 text-14m transition-all duration-300 hover:bg-b-primary"
            >
              <span>{group.name}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))
      ) : (
        <SidebarMenuItem className="my-pr-12 text-center text-14m text-t-default">
          소속된 팀이 없습니다.
        </SidebarMenuItem>
      )}
    </>
  );
}

export default SideNavTeamList;
