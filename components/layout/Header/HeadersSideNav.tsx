import SideNavigation from '@/components/SideNavigation/SideNavigation';
import SideNavigationTrigger from '@/components/SideNavigation/SideNavigationTrigger';
import useUser from '@/hooks/useUser';

function HeadersSideNav() {
  const { groups, isPending } = useUser();

  return (
    <div className="pc:hidden mo:block ta:hidden">
      <SideNavigationTrigger
        src="/images/icon-gnb-menu.svg"
        alt="그룹 네비게이션"
      />
      <SideNavigation
        groups={groups || null}
        isPending={isPending}
        showSkeleton={true}
        skeletonLength={10}
      />
    </div>
  );
}

export default HeadersSideNav;
