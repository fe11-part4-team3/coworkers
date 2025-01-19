'use client';

import Link from 'next/link';

import useUserStore from '@/store/useUser.store';
import useUserInfo from '@/hooks/useUserInfo';
import { useAuth } from '@/hooks/useAuth';
import { testStyled } from '@/styles/test.styles';
import Container from '@/components/layout/Container';
import TestTaskCard from '@/components/TaskCard/Test.TaskCard';

export default function LandingPage() {
  const { isAuthenticated } = useAuth();
  const { user } = useUserStore((state) => state);

  useUserInfo();

  return (
    <Container>
      <div>랜딩 페이지</div>
      {isAuthenticated && user && (
        <div>
          <div>안녕하세요, {user.nickname}님!</div>
          <div>이메일: {user.email}</div>
        </div>
      )}
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

      <TestTaskCard />
    </Container>
  );
}
