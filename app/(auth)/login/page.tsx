'use client';

import React, { useEffect, MouseEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';

import { signIn } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import useModalStore from '@/stores/modalStore';
import ResetPassword from '@/components/modal/ResetPassword';

function LoginPage() {
  const { formData, handleInputChange, errorMessage } = useForm({
    email: '',
    password: '',
  });

  const route = useRouter();
  const { user, reload, isAuthenticated } = useUser();
  const { openModal } = useModalStore();

  // submit 후 로그인 에러 메시지
  const [hasLoginError, setHasLoginError] = useState('');

  const { mutateAsync: postLogin, isPending: isLogin } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      reload();
      alert('로그인이 완료 되었습니다.');
      console.log('로그인 완료');
    },
    onError: () => setHasLoginError('이메일 혹은 비밀번호를 확인해주세요.'),
  });

  // 로그인 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postLogin(formData);
  };

  // 비밀번호 찾기 모달 오픈
  const handleOpenResetPassword = (e: MouseEvent) => {
    e.preventDefault();
    openModal(<ResetPassword />);
  };

  // 로그인 성공 시
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
    <>
      <form onSubmit={handleSubmit}>
        <div className="auth_input-list">
          <InputField
            label="이메일"
            type="email"
            name="email"
            autoComplete="username"
            value={formData.email}
            onChange={(e) => {
              handleInputChange(e);
              setHasLoginError('');
            }}
            errorMessage={hasLoginError ? hasLoginError : errorMessage.email}
            placeholder="이메일을 입력해주세요."
            required
          />
          <InputField
            label="비밀번호"
            type="password"
            name="password"
            autoComplete="current-password"
            value={formData.password}
            onChange={handleInputChange}
            errorMessage={errorMessage.password}
            placeholder="비밀번호를 입력해주세요."
            required
          />
        </div>
        {/* 비밀번호 찾기 모달 오픈 버튼 */}
        <div className="mt-pr-12 text-right">
          <button
            type="button"
            className="link-underline"
            onClick={handleOpenResetPassword}
          >
            비밀번호를 잊으셨나요?
          </button>
        </div>

        <Buttons
          text="로그인"
          type="submit"
          className="mt-pr-40"
          disabled={
            isLogin ||
            !(errorMessage.email === '' && errorMessage.password === '')
          }
          loading={isLogin}
        />
      </form>

      <div className="mt-pr-24 flex justify-center space-x-pr-12 text-16m">
        <p>아직 계정이 없으신가요?</p>
        <Link href="/signup" className="link-underline">
          가입하기
        </Link>
      </div>
    </>
  );
}

export default LoginPage;
