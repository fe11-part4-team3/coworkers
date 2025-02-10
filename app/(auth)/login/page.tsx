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
import { useSnackbar } from '@/contexts/SnackBar.context';

function LoginPage() {
  const initialValues = {
    email: '',
    password: '',
  };

  const { formData, handleInputChange, changedFields, errorMessage } =
    useForm(initialValues);

  const route = useRouter();
  const { reload, user } = useUser();
  const { openModal } = useModalStore();

  const { showSnackbar } = useSnackbar();

  // STUB submit 후 로그인 에러 메시지
  const [hasLoginError, setHasLoginError] = useState('');

  // STUB 일반 로그인 api mutate
  const { mutateAsync: postLogin, isPending: isLogin } = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      reload();
      showSnackbar('로그인이 완료 되었습니다.');
    },
    onError: () => setHasLoginError('이메일 혹은 비밀번호를 확인해주세요.'),
  });

  // STUB 로그인 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postLogin(formData);
  };

  // STUB 비밀번호 찾기 모달 오픈
  const handleOpenResetPassword = (e: MouseEvent) => {
    e.preventDefault();
    openModal(<ResetPassword />);
  };

  useEffect(() => {
    if (user) {
      // STUB 로그인 후 가입된 그룹이 있을 때, 첫 번째 그룹으로 이동
      if (user.memberships.length > 0) {
        route.push(`/${user.memberships[0].groupId}`);
      } else {
        route.push(`/`);
      }
    } else {
      return;
    }
  }, [route, user]);

  const requiredFields = Object.keys(initialValues);

  const hasDisabled =
    requiredFields.some(
      (field) => !changedFields[field as keyof typeof changedFields],
    ) ||
    requiredFields.some(
      (field) => errorMessage[field as keyof typeof errorMessage] !== '',
    );

  // STUB 로그인 상태가 아닐 때
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
          disabled={hasDisabled}
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
