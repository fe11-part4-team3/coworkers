'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { signIn } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';

function LoginPage() {
  const { formData, handleChange, errorMessage } = useForm({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);
  const route = useRouter();
  const { user, reload, isAuthenticated } = useUser();

  // 로그인 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await signIn(formData);
      if (!response) return;
      reload();
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  useEffect(() => {
    if (user) alert('로그인 성공!');
  }, [user]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user && user.memberships.length > 0) {
        route.push(`/${user.memberships[0].groupId}`);
      } else {
        route.push(`/`);
      }
    } else {
      return;
    }
  }, [user, route, isAuthenticated]);

  // 로그인 상태가 아닐 때
  return (
    <Container>
      <h1>로그인</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="이메일"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          errorMessage={errorMessage.email}
          placeholder="이메일을 입력해주세요."
          required
        />
        <InputField
          label="비밀번호"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          errorMessage={errorMessage.password}
          placeholder="비밀번호를 입력해주세요."
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Buttons
          text="로그인"
          type="submit"
          disabled={
            !(errorMessage.email === '' && errorMessage.password === '')
          }
        />
      </form>
    </Container>
  );
}

export default LoginPage;
