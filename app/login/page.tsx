'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import useUserStore from '@/store/useUser.store';
import { signIn } from '@/service/auth.api';
import { useAuth } from '@/hooks/useAuth';
import useUserInfo from '@/hooks/useUserInfo';
import { testStyled } from '@/styles/test.styles';
import useForm from '@/hooks/useForm';

function LoginPage() {
  const { formData, handleChange } = useForm({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string | null>(null);

  const route = useRouter();

  // 인증된 사용자인지 확인
  const { setAccessToken, isAuthenticated, accessToken } =
    useAuth();

  // 사용자 정보 상태 및 초기화 함수
  const { user } = useUserStore();

  // 사용자 정보 불러오는 훅
  useUserInfo();

  // 로그인 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await signIn(
        formData,
        setAccessToken,
      );

      if (response.accessToken) {
        setAccessToken(response.accessToken);
      }
      alert('로그인 되었습니다.');
      route.push('/');
    } catch (err) {
      console.error('로그인 실패:', err);
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 로그인 상태일 때
  if (isAuthenticated && accessToken && user) {
    route.push('/mypage');
  }

  // 로그인 상태가 아닐 때
  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이메일:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" className={testStyled}>
          로그인
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
