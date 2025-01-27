'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import { resetPasswordEmail } from '@/service/user.api';
import { ResetPasswordEmailParams } from '@/types/user.type';

function LoginPage() {
  const { formData, handleInputChange } = useForm({
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

  // 비밀번호 찾기 클릭 상태
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // 비밀번호 찾기 폼
  const { formData: createResetUrl, handleInputChange: handleEailChange } =
    useForm<ResetPasswordEmailParams>({
      email: '',
      redirectUrl: 'http://localhost:3000',
    });

  // 비밀번호 찾기 요청
  const { mutate: resetPasswordMutate, isPending } = useMutation({
    mutationFn: resetPasswordEmail,
    onSuccess: (message) => {
      alert(message);
      setIsForgotPassword(false);
    },
    onError: (error) => console.error('비밀번호 재설정 실패:', error),
  });

  // 로그인 상태가 아닐 때
  return (
    <Container>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            비밀번호:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleInputChange(e)}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <Button type="submit">로그인</Button>

        {/* 비밀번호 찾기 모달 오픈 버튼 */}
        <button
          className="text-16m text-brand-primary underline"
          onClick={() => setIsForgotPassword(true)}
        >
          비밀번호를 잊으셨나요?
        </button>

        {/* TODO 임의 비밀번호 재설정 모달 */}
        {isForgotPassword && (
          <div>
            <h2>비밀번호 재설정</h2>
            <p>비밀번호 재설정 링크를 보내드립니다.</p>
            <InputField
              label="이메일"
              type="email"
              name="email"
              value={createResetUrl.email}
              onChange={handleEailChange}
              placeholder="이메일을 입력하세요"
            />
            <Buttons
              text="링크 보내기"
              onClick={() => resetPasswordMutate(createResetUrl)}
              disabled={isPending}
            />
          </div>
        )}
      </form>
    </Container>
  );
}

export default LoginPage;
