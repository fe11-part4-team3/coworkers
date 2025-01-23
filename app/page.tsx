'use client';

import Link from 'next/link';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';

export default function LandingPage() {
  const { user, memberships, isPending } = useUser();

  if (isPending && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (user && !memberships) {
    return (
      <Container>
        <h1>아직 소속됨 팀이 없습니다. 팀을 생성하거나 팀에 참여해보세요.</h1>
        <div className="flex gap-pr-10">
          <Link href="/addteam">
            <Button variant="link">팀 생성하기</Button>
          </Link>
          <Button>팀 참여하기</Button>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div>랜딩 페이지</div>
    </Container>
  );
}
