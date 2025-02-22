'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { signUp } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useUser from '@/hooks/useUser';

const initialValues = {
  email: '',
  nickname: '',
  password: '',
  passwordConfirmation: '',
};

function SignupPage() {
  const { formData, handleInputChange, changedFields, errorMessage } =
    useForm(initialValues);

  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  const { user, memberships } = useUser();

  const route = useRouter();

  const { showSnackbar } = useSnackbar();

  const { mutateAsync: postSignup, isPending: isSignup } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      showSnackbar('회원가입이 완료 되었습니다.');
      route.push('/login');
    },
    onError: () => showSnackbar('이미 사용중인 이메일입니다.', 'error'),
  });

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postSignup(formData);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    // 비밀번호가 변경될 때 비밀번호 확인 필드의 오류 메시지를 업데이트
    if (
      formData.passwordConfirmation &&
      e.target.value !== formData.passwordConfirmation
    ) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmationError('');
    }
  };

  const handlePasswordConfirmationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    handleInputChange(e);

    // 비밀번호 확인 필드가 변경될 때 오류 메시지를 업데이트
    if (e.target.value !== formData.password) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmationError('');
    }
  };

  useEffect(() => {
    if (user) {
      if (memberships && memberships.length > 0) {
        route.push(`/${memberships[0].groupId}`);
      } else {
        route.push(`/`);
      }
    }
  }, [route, user, memberships]);

  const requiredFields = Object.keys(initialValues);

  const hasDisabled =
    requiredFields.some(
      (field) => !changedFields[field as keyof typeof changedFields],
    ) ||
    requiredFields.some(
      (field) => errorMessage[field as keyof typeof errorMessage] !== '',
    ) ||
    formData.password !== formData.passwordConfirmation;

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth_input-list">
        <InputField
          label="닉네임"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          errorMessage={errorMessage.nickname}
          placeholder="닉네임을 입력해주세요."
          required
        />

        <InputField
          label="이메일"
          type="email"
          name="email"
          autoComplete="username"
          value={formData.email}
          onChange={handleInputChange}
          errorMessage={errorMessage.email}
          placeholder="이메일을 입력해주세요."
          required
        />

        <InputField
          label="비밀번호"
          type="password"
          name="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handlePasswordChange}
          errorMessage={errorMessage.password}
          placeholder="비밀번호를 입력해주세요."
          required
        />

        <InputField
          label="비밀번호 확인"
          type="password"
          name="passwordConfirmation"
          autoComplete="new-password"
          value={formData.passwordConfirmation}
          onChange={handlePasswordConfirmationChange}
          errorMessage={
            errorMessage.passwordConfirmation || passwordConfirmationError
          }
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          required
        />
      </div>
      <Buttons
        text="회원가입"
        type="submit"
        className="mt-pr-40"
        disabled={hasDisabled}
        loading={isSignup}
      />
    </form>
  );
}

export default SignupPage;
