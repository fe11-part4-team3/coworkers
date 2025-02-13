'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import useGroup from '@/hooks/useGroup';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { group, membership, isPending } = useGroup();

  useEffect(() => {
    if (group && !isPending && !membership) router.push('/');
  }, [group, isPending, membership]);

  if (!group && isPending) return null;

  if (group && !membership) return null;

  return <>{children}</>;
}
