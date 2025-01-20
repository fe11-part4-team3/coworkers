'use client';

import Link from 'next/link';

import useUserStore from '@/stores/useUser.store';
import { useAuth } from '@/hooks/useAuth';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  if (isAuthenticated && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (user && user.memberships.length === 0) {
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
      <div className="flex gap-pr-10">
        <Link href="/login">
          <Button variant="link">로그인</Button>
        </Link>
        <Link href="/signup">
          <Button variant="link">회원가입</Button>
        </Link>
      </div>
    </Container>
  );
}
