'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import Buttons from '@/components/Buttons';
import useUser from '@/hooks/useUser';
import Empty from '@/components/Empty/Empty';
import Container from '@/components/layout/Container';
import LandingCardList from '@/components/Landing/LandingCardList';

export default function LandingPage() {
  const { user, memberships, isPending } = useUser();
  const router = useRouter();

  const handleButtonClick = () => {
    if (user) {
      const teamId = memberships?.[0]?.group?.id;
      router.push(teamId ? `/${teamId}` : '/addteam');
    } else {
      router.push('/login');
    }
  };

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
    <motion.div
      className="mt-pr-60 flex w-screen flex-col items-center overflow-x-hidden"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.5,
        delay: 0.3,
      }}
    >
      <section className="relative h-pr-1080 w-screen mo:h-pr-640 ta:h-pr-940">
        <Image
          src="/images/landing/img-Landing-bg.png"
          alt="background"
          fill
          className="floating-boat absolute inset-0 object-cover tamo:hidden"
        />
        <Image
          src="/images/landing/img-Landing-bg-ta.png"
          alt="background-tablet"
          fill
          className="absolute inset-0 hidden object-cover mo:hidden ta:block"
        />
        <div
          className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat mo:block"
          style={{
            backgroundImage: "url('/images/landing/img-Landing-bg-mo.png')",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            delay: 0.5,
          }}
        >
          <div className="absolute left-1/2 top-pr-204 flex -translate-x-1/2 flex-col items-center justify-center gap-pr-20 text-center mo:top-pr-175 mo:gap-pr-4 ta:top-pr-220">
            <h2 className="flex gap-pr-24 whitespace-nowrap text-48sb text-t-primary mo:gap-pr-4 mo:text-24sb ta:text-40sb">
              함께 만들어가는 투두 리스트
              <Image
                src="/images/landing/icon-Tool.svg"
                alt="Tool"
                width={56}
                height={56}
                className="mo:size-pr-28 ta:size-pr-48"
              />
            </h2>
            <h2 className="whitespace-nowrap bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-center text-64sb text-transparent mo:text-32sb ta:text-48sb">
              Coworkers
            </h2>
          </div>
        </motion.div>

        <div className="absolute bottom-pr-120 left-1/2 -translate-x-1/2 mo:bottom-pr-48 ta:bottom-pr-119">
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

      <LandingCardList />

      <footer>
        <div className="relative flex h-pr-1080 w-screen flex-col items-center mo:h-pr-640 ta:h-pr-940">
          <Image
            src="/images/landing/img-Landing-bottom.png"
            alt="background-bottom"
            fill
            className="absolute inset-0 object-cover tamo:hidden"
          />
          <Image
            src="/images/landing/img-Landing-bottom-ta.png"
            alt="background-bottom-tablet"
            fill
            className="absolute inset-0 hidden object-cover mo:hidden ta:block"
          />
          <Image
            src="/images/landing/img-Landing-bottom-mo.png"
            alt="background-bottom-mobile"
            fill
            className="absolute inset-0 hidden object-cover mo:block"
          />

          <motion.div
            className="absolute top-pr-230 flex flex-col items-center mo:top-pr-123 ta:top-pr-176"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.3,
            }}
          >
            <h1 className="mb-pr-24 text-center text-40sb text-t-primary mo:mb-pr-16 mo:text-24sb">
              지금 바로 시작해보세요
            </h1>
            <h2 className="text-center text-24m text-t-primary mo:text-16m">
              팀원 모두와 같은 방향, <br className="hidden mo:block" />
              같은 속도로 나아가는 가장 쉬운 방법
            </h2>
          </motion.div>
        </div>
      </footer>
    </motion.div>
  );
}
