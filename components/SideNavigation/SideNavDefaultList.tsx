import { SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

/**
 * STUB 사이드 네비게이션 자유게시판
 * @param props
 * @param props.handleClick 클릭 이벤트 핸들러
 */
function SideNavDefaultList({
  handleClick,
}: {
  handleClick: (path: string) => void;
}) {
  return (
    <SidebarMenuItem className="border-t">
      <SidebarMenuButton
        className="my-pr-12 py-pr-4 text-14m hover:bg-b-primary"
        onClick={() => handleClick('/boards')}
      >
        <span>자유게시판</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default SideNavDefaultList;
