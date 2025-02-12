'use client';

import useGroup from '@/hooks/useGroup';
import useUser from '@/hooks/useUser';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const params = useParams();
  const safeParams = useMemo(() => params, [params]);
  const { teamId } = safeParams;

  const { memberships } = useUser();
  const { group, isPending } = useGroup(Number(teamId));

  const currentMembership = memberships?.find(
    (membership) => membership.groupId === group?.id,
  );

  useEffect(() => {
    if (group && !isPending && !currentMembership) router.push('/');
  }, [group, isPending, currentMembership]);

  if (!group && isPending) return null;

  if (group && !currentMembership) return null;

  return <>{children}</>;
}
