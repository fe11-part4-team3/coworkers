'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Buttons from '@/components/Buttons';
// import useUser from '@/hooks/useUser';

export default function LandingPage() {
  // const { user, memberships, isPending } = useUser();

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

          <div className="mt-pr-675">
            <Buttons text="Gradient" backgroundColor="gradient" />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-pr-80">
        <div className="border-pr-2 relative h-pr-419 w-pr-966 rounded-pr-40 border border-brand-gradient">
          <Image
            src="/images/landing/img-mockup1.png"
            alt="mockup1"
            width={291}
            height={338}
            className="absolute bottom-pr-0 left-pr-174"
          />
          <div className="absolute right-pr-181 top-pr-155 flex h-pr-120 w-pr-157 flex-col items-start justify-between">
            <Image
              src="/images/landing/img-foldericon.svg"
              alt="foldericon"
              width={48}
              height={48}
            />
            <div>
              그룹으로
              <br />할 일을 관리해요
            </div>
          </div>
        </div>
        <div className="relative h-pr-419 w-pr-966 rounded-pr-40 bg-b-secondary">
          <div className="absolute left-pr-165 top-pr-151 flex h-pr-116 w-pr-172 flex-col items-start justify-between">
            <Image
              src="/images/landing/img-messageicon.svg"
              alt="messageicon"
              width={48}
              height={48}
            />
            <div className="text-right">
              간단하게 멤버들을
              <br />
              초대해요
            </div>
          </div>
          <Image
            src="/images/landing/img-mockup2.png"
            alt="mockup2"
            width={291}
            height={338}
            className="absolute right-pr-174 top-pr-0"
          />
        </div>
        <div className="border-pr-2 relative h-pr-419 w-pr-966 rounded-pr-40 bg-b-secondary-2">
          <Image
            src="/images/landing/img-mockup3.png"
            alt="mockup3"
            width={291}
            height={338}
            className="absolute left-pr-174 top-pr-0"
          />
          <div className="absolute right-pr-181 top-pr-155 flex h-pr-120 w-pr-157 flex-col items-start justify-between">
            <Image
              src="/images/landing/img-checkicon.svg"
              alt="foldericon"
              width={48}
              height={48}
            />
            <div>
              할 일도 간편하게
              <br />
              체크해요
            </div>
          </div>
        </div>
        <div className="relative flex flex-col">
          <div className="absolute top-pr-230 w-full text-center">
            <div>지금 바로 시작해보세요</div>
            <div>
              팀원 모두와 같은 방향, 같은 속도로 나아가는 가장 쉬운 방법
            </div>
          </div>
          <Image
            src="/images/landing/img-landing-bottom.png"
            alt="landing-bottom"
            width={1920}
            height={1080}
          />
        </div>
      </div>
    </div>
  );
}
