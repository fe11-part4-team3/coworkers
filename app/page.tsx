'use client';

import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/layout/Container';
import Buttons from '@/components/Buttons';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import IconTextBox from '@/components/Landing/IconTextbox';
import ImageBox from '@/components/Landing/Imagebox';

export default function LandingPage() {
  const router = useRouter();

  const { user, memberships } = useUser();

  const handleButtonClick = () => {
    if (user) {
      const teamId = memberships?.[0]?.group?.id;
      router.push(teamId ? `/${teamId}` : '/addteam');
    } else {
      router.push('/login');
    }
  };

  return (
    <div className="w-full">
      <div className="relative mt-pr-60 flex h-pr-1080 w-full flex-col items-center">
        <div className="absolute left-0 top-0 h-full w-full">
          <Image
            src="/images/landing/img-Landing-bg.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            priority
            className="hidden lg:block"
            sizes="(min-width: 1024px) 1920px"
          />
          <Image
            src="/images/landing/img-Landing-bg-ta.png"
            alt="Tablet Background"
            layout="fill"
            objectFit="cover"
            priority
            className="hidden md:block lg:hidden"
            sizes="(min-width: 744px) and (max-width: 1023px) 744px"
          />
          <Image
            src="/images/landing/img-Landing-bg-mo.png"
            alt="Mobile Background"
            layout="fill"
            objectFit="cover"
            priority
            className="block md:hidden"
            sizes="(max-width: 743px) 375px"
          />
        </div>

        {/* 컨텐츠 영역 */}
        <div className="relative z-10 mt-pr-84 flex h-full flex-col items-center justify-between gap-pr-20">
          <div className="flex items-center justify-center gap-pr-20">
            <div className="text-48sb mo:text-24sb ta:text-40sb">
              함께 만들어가는 투두 리스트
            </div>

            <Image
              src="/images/landing/img-Tool.svg"
              alt="Tool"
              width={56}
              height={56}
              className="h-pr-56 w-pr-56 mo:h-pr-28 mo:w-pr-28 ta:h-pr-48 ta:w-pr-48"
            />
          </div>

          <h2 className="bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-center text-64sb text-transparent mo:text-32sb ta:text-48sb">
            Coworkers
          </h2>

          <div className="flex-1"></div>

          <div className="mb-pr-120 mt-pr-40 mo:mt-pr-20 ta:mt-pr-60">
            <Buttons
              text="지금 시작하기"
              backgroundColor="gradient"
              size="M"
              className="w-pr-373 mo:w-pr-343 tamo:text-16sb"
              rounded={true}
              onClick={handleButtonClick}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-pr-80">
        <div className="relative h-pr-419 w-pr-966 rounded-pr-40 bg-gradient-to-r from-brand-primary to-brand-tertiary p-pr-1">
          <div className="relative flex h-full w-full rounded-pr-40 bg-b-primary shadow-lg backdrop-blur-md">
            <ImageBox
              imageUrl="/images/landing/img-mockup1.png"
              position="right"
              align="end"
            />
            <IconTextBox
              imageUrl="/images/landing/img-foldericon.svg"
              text="그룹으로\n할 일을 관리해요"
              position="right"
            />
          </div>
        </div>
        <div className="relative flex h-pr-419 w-pr-966 rounded-pr-40 bg-b-secondary">
          <IconTextBox
            imageUrl="/images/landing/img-messageicon.svg"
            text="간단하게 멤버들을 \n초대해요"
            position="left"
          />

          <ImageBox
            imageUrl="/images/landing/img-mockup2.png"
            position="left"
            align="start"
          />
        </div>
        <div className="border-pr-1 backdrop-blur-12 relative flex h-pr-419 w-pr-966 rounded-pr-40 border-b-primary bg-b-secondary-2 bg-slate-950">
          <ImageBox
            imageUrl="/images/landing/img-mockup3.png"
            position="right"
            align="start"
          />
          <IconTextBox
            imageUrl="/images/landing/img-checkicon.svg"
            text="할 일도 간편하게\n체크해요"
            position="right"
          />
        </div>
        <div className="relative flex flex-col">
          <div className="absolute top-pr-230 w-full text-center">
            <div className="mb-pr-24 text-40sb">지금 바로 시작해보세요</div>
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
