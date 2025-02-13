import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import NavigationGroupDropdown from '@/components/NavigationGroupDropdown/NavigationGroupDropdown';
import { Button } from '@/components/ui/button';
import { IGroup } from '@/types/group.type';
import useUser from '@/hooks/useUser';

function HeadersGnb() {
  const [currentGroup, setCurrentGroup] = useState<IGroup | null>(null);
  const { groups, isPending, user } = useUser();
  const router = useRouter();
  const params = useParams();
  const safeParams = React.useMemo(() => params, [params]);
  const { teamId } = safeParams;
  const groupId = teamId ? Number(teamId) : null;

  useEffect(() => {
    if (!groupId || !groups || isPending) {
      setCurrentGroup(null);
      return;
    }
    const group = groups.find((group) => group.id === groupId);
    if (group) setCurrentGroup(group);
    else setCurrentGroup(null);
  }, [groupId, groups, isPending, router]);

  return (
    <nav className="flex flex-1 items-center gap-pr-40 mo:hidden ta:gap-pr-24">
      <div className="space-x-pr-8">
        {groups && (
          <NavigationGroupDropdown
            groups={groups}
            isPending={isPending}
            currentGroup={currentGroup}
          />
        )}
        {user && (
          <Link href="/boards">
            <Button variant="link">
              <span className="text-16m">자유게시판</span>
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default HeadersGnb;
