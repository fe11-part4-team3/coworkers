'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Buttons from '@/components/Buttons';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useUser();

  const handleButtonClick = () => {
    if (isAuthenticated) {
      router.push('/team/create');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="w-full">
      <div className="relative flex h-pr-1080 w-full justify-center bg-[url('/images/landing/img-Landing-bg.png')] bg-cover bg-center bg-no-repeat">
        <div className="mt-pr-84 flex flex-col items-center justify-start gap-pr-20">
          <div className="flex items-center justify-center gap-pr-20">
            <div className="text-48sb">함께 만들어가는 투두 리스트</div>
            <Image
              src="/images/landing/img-Tool.svg"
              alt="Tool"
              width={56}
              height={56}
            />
          </div>

          <div className="flex h-pr-76 w-pr-322 items-center justify-center">
            <div className="text-64sb bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-center text-transparent">
              Coworkers
            </div>
          </div>

          <div className="mt-pr-675">
            <Buttons
              text="지금 시작하기"
              backgroundColor="gradient"
              size="M"
              width="w-pr-373"
              rounded={true}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center gap-pr-80">
        <div className="relative h-pr-419 w-pr-966 rounded-pr-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-[1px]">
          <div className="h-full w-full rounded-pr-40 bg-b-primary p-5 shadow-lg backdrop-blur-md">
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
              <div className="text-24m">
                그룹으로
                <br />할 일을 관리해요
              </div>
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
            <div className="text-right text-24m">
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
        <div className="border-pr-1 relative h-pr-419 w-pr-966 rounded-pr-40 border-b-primary bg-b-secondary-2">
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
            <div className="text-24m">
              할 일도 간편하게
              <br />
              체크해요
            </div>
          </div>
        </div>
        <div className="relative flex flex-col bg-b-secondary">
          <div className="absolute top-pr-230 w-full text-center">
            <div className="text-40sb mb-pr-24">지금 바로 시작해보세요</div>
            <div className="text-24m">
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
