'use client';

import { usePathname } from 'next/navigation';

import Container from '@/components/layout/Container';
import OauthForm from '@/components/OauthForm';

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  const pathName = usePathname();
  const currentPath = pathName.split('/').pop();

  const pageTitles: Record<string, string> = {
    login: '로그인',
    signup: '회원가입',
    addteam: '팀 생성하기',
    'reset-password': '비밀번호 재설정',
    jointeam: '팀 참여하기',
  };

  const getTitle = (page: string | undefined) => {
    return page ? pageTitles[page] : undefined;
  };

  return (
    <Container className="py-pr-140 mo:py-pr-24 ta:py-pr-100">
      <h1 className="mb-pr-80 text-center text-40m mo:mb-pr-24 tamo:text-24m">
        {getTitle(currentPath)}
      </h1>
      <div className="mx-auto w-pr-460 mo:w-full">
        {children}
        <div className="mt-pr-48 mo:mt-pr-25">
          {currentPath && ['login', 'signup'].includes(currentPath) && (
            <OauthForm type={currentPath as 'login' | 'signup'} />
          )}
        </div>
      </div>
    </Container>
  );
}
