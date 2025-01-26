'use client';

import Link from 'next/link';
import Image from 'next/image';
import useUserStore from '@/stores/useUser.store';
import { useAuth } from '@/hooks/useAuth';
import { testStyled } from '@/styles/test.styles';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore();

  // if (isAuthenticated && !user) {
  //   return <div>사용자 정보를 불러오는 중입니다...</div>;
  // }

  // if (user && user.memberships.length === 0) {
  //   return (
  //     <Container>
  //       <h1>아직 소속됨 팀이 없습니다. 팀을 생성하거나 팀에 참여해보세요.</h1>
  //       <div className="flex gap-pr-10">
  //         <Link href="/addteam">
  //           <Button variant="link">팀 생성하기</Button>
  //         </Link>
  //         <Button>팀 참여하기</Button>
  //       </div>
  //     </Container>
  //   );
  // }

  return (
    <div className="w-full">
      <Container>
        <div>랜딩 페이지</div>
        <div className="flex gap-pr-10">
          {isAuthenticated && user ? (
            <Link
              href="/mypage"
              className="rounded-md bg-b-secondary p-pr-15 text-16"
            >
              마이페이지
            </Link>
          ) : (
            <>
              <Link href="/login" className={testStyled}>
                로그인 페이지
              </Link>
              <Link href="/signup" className={testStyled}>
                회원가입 페이지
              </Link>
            </>
          )}
        </div>
      </Container>
      <div className="relative flex h-pr-1080 w-full justify-center bg-[url('/images/landing/img-Landing-bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="mt-pr-84 flex flex-col items-center justify-start gap-pr-20">
          <div className="flex items-center justify-center gap-pr-20">
            <div className="text-48sm">함께 만들어가는 투두 리스트</div>
            <Image
              src="/images/landing/img-Tool.svg"
              alt="Tool"
              width={56}
              height={56}
            />
          </div>

          <div className="flex h-pr-76 w-pr-322 items-center justify-center">
            <div className="text-center">Coworkers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
