'use client';

import Container from '@/components/layout/Container';
import useUser from '@/hooks/useUser';
import Empty from '@/components/Empty';

export default function LandingPage() {
  const { user, memberships, isPending } = useUser();

  if (isPending && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (user && !memberships) {
    return (
      <Container className="flex items-center justify-center">
        <Empty>
          <Empty.TextWrapper>
            <Empty.Text text="아직 소속된 팀이 없습니다." />
            <Empty.Text text="팀을 생성하거나 팀에 참여해보세요." />
          </Empty.TextWrapper>
          <Empty.ButtonWrapper>
            <Empty.Buttons text="팀 생성하기" href="/addteam" />
            <Empty.ButtonsBorder text="팀 참여하기" href="/jointeam" />
          </Empty.ButtonWrapper>
        </Empty>
      </Container>
    );
  }

  return (
    <Container>
      <div>랜딩 페이지</div>
    </Container>
  );
}
