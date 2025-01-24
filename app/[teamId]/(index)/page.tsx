'use client';

import { useParams } from 'next/navigation';
import { useEffect } from 'react';

import Container from '@/components/layout/Container';
import GroupMemberCard from '@/app/[teamId]/(index)/GroupMemberCard';
import useUser from '@/hooks/useUser';
import useGroup from '@/hooks/useGroup';

import GroupHeader from './GroupHeader';
import GroupMemberList from './GroupMemberList';

export default function TeamPage() {
  const { teamId } = useParams();
  const { group, members, taskLists } = useGroup(Number(teamId));
  useUser(true);

  useEffect(() => {
    console.dir(group);
    console.dir(members);
    console.dir(taskLists);
  }, [group, members, taskLists]);

  if (!group) return null;

  return (
    <>
      <Container>
        <div className="flex flex-col gap-pr-24 pt-pr-24">
          <GroupHeader name={group.name} />
          <GroupMemberList groupId={group.id} members={members} />
        </div>
      </Container>
    </>
  );
}
