import Link from 'next/link';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';

function HeadersGnb() {
  const { groups, isPending, user } = useUser();
  const { group } = useGroup();

  return (
    <nav className="flex flex-1 items-center gap-pr-40 mo:hidden ta:gap-pr-24">
      {groups && (
        <NavigationGroupDropdown
          groups={groups}
          isPending={isPending}
          currentGroup={group}
        />
      )}
      {user && (
        <Link href="/boards">
          <Button variant="link">
            <span className="text-16m">자유게시판</span>
          </Button>
        </Link>
      )}
    </nav>
  );
}

export default HeadersGnb;
