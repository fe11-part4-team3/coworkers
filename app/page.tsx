'use client';

import Image from 'next/image';
import Buttons from '@/components/Buttons';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import MainBox1 from '@/components/Landing/Mainbox1';
import MainBox2 from '@/components/Landing/Mainbox2';
import MainBox3 from '@/components/Landing/Mainbox3';
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
    <div className="flex w-screen flex-col items-center">
      <section className="relative h-pr-1080 w-screen mo:h-pr-640 ta:h-pr-940">
        <img
          src="/images/landing/img-Landing-bg.png"
          alt="background"
          className="absolute inset-0 top-pr-60 h-full w-full object-cover mo:hidden ta:hidden"
        />
        <img
          src="/images/landing/img-Landing-bg-ta.png"
          alt="background-tablet"
          className="absolute inset-0 top-pr-60 hidden h-full w-full object-cover mo:hidden ta:block"
        />
        <div
          className="absolute inset-0 top-pr-60 hidden bg-cover bg-center bg-no-repeat mo:block"
          style={{
            backgroundImage: "url('/images/landing/img-Landing-bg-mo.png')",
          }}
        />

        <div className="absolute left-1/2 top-pr-204 flex -translate-x-1/2 transform flex-col items-center justify-center gap-pr-20 text-center mo:top-pr-175 ta:top-pr-220">
          <h2 className="flex gap-pr-24 whitespace-nowrap text-48sb text-t-primary mo:gap-pr-4 mo:text-24sb ta:text-40sb">
            함께 만들어가는 투두 리스트
            <Image
              src="/images/landing/img-Tool.svg"
              alt="Tool"
              width={56}
              height={56}
              className="mo:h-pr-28 mo:w-pr-28 ta:h-pr-48 ta:w-pr-48"
            />
          </h2>
          <h2 className="whitespace-nowrap bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-center text-64sb text-transparent mo:text-32sb ta:text-48sb">
            Coworkers
          </h2>
        </div>

        <div className="absolute bottom-pr-120 left-1/2 -translate-x-1/2 transform mo:bottom-pr-48 ta:bottom-pr-119">
          <Buttons
            text="지금 시작하기"
            backgroundColor="gradient"
            size="M"
            className="w-pr-373 whitespace-nowrap mo:w-pr-343"
            rounded={true}
            onClick={handleButtonClick}
          />
        </div>
      </section>

      <section className="relative flex flex-col items-center gap-pr-80 tamo:gap-pr-24">
        <MainBox1 />
        <MainBox2 />
        <MainBox3 />
      </section>

      <footer>
        <div className="relative flex h-pr-1080 w-screen flex-col items-center">
          <img
            src="/images/landing/img-Landing-bottom.png"
            alt="background-bottom"
            className="absolute inset-0 h-full w-full object-cover mo:hidden ta:hidden"
          />
          <img
            src="/images/landing/img-Landing-bottom-ta.png"
            alt="background-bottom-tablet"
            className="absolute inset-0 hidden h-full w-full object-cover mo:hidden ta:block"
          />
          <div
            className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat mo:block"
            style={{
              backgroundImage:
                "url('/images/landing/img-Landing-bottom-mo.png')",
            }}
          />

          <div className="absolute top-pr-230 flex flex-col items-center gap-pr-24 mo:top-pr-123 ta:top-pr-176">
            <div className="text-center text-40sb text-t-primary mo:text-24sb ta:text-40sb">
              지금 바로 시작해보세요
            </div>
            <div className="text-center text-24m text-t-primary mo:text-16m ta:text-24m">
              팀원 모두와 같은 방향, <br className="hidden mo:block" />
              같은 속도로 나아가는 가장 쉬운 방법
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
