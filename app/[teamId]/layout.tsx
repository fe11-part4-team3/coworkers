'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useGroup from '@/hooks/useGroup';
import useUser from '@/hooks/useUser';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { memberships } = useUser();
  const { group, isPending } = useGroup();

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
