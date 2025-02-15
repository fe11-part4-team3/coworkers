import classNames from 'classnames';

import { SidebarMenuItem, SidebarMenuButton } from '../ui/sidebar';

/**
 * STUB 사이드 네비게이션 자유게시판
 * @param props
 * @param props.handleClick 클릭 이벤트 핸들러
 */
function SideNavDefaultList({
  handleClick,
  pathname,
}: {
  handleClick: (path: string) => void;
  pathname: string;
}) {
  const isActive = pathname === '/boards';

  return (
    <SidebarMenuItem className="border-t">
      <SidebarMenuButton
        className={classNames(
          'my-pr-12 py-pr-4 text-14m hover:bg-b-primary',
          isActive ? 'text-brand-primary' : '',
        )}
        onClick={() => handleClick('/boards')}
      >
        <span>자유게시판</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default SideNavDefaultList;
