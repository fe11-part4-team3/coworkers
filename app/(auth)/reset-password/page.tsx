'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/service/user.api';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';

const initialValues = {
  password: '',
  passwordConfirmation: '',
  token: '',
};

/**
 * STUB 비밀번호 초기화 페이지
 */
export default function ResetPasswordPage() {
  // STUB 비밀번호 초기화 토큰 가져오기
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

  const { showSnackbar } = useSnackbar();

  // STUB 비밀번호 초기화 폼
  const {
    formData: updatePasswordData,
    handleInputChange,
    errorMessage,
    changedFields,
  } = useForm(initialValues);

  const route = useRouter();

  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState('');

  // STUB 토큰이 있을 경우 초기화 폼에 토큰 추가
  useEffect(() => {
    if (resetToken) {
      updatePasswordData.token = resetToken;
    }
  }, []);

  // STUB 비밀번호 초기화 요청
  const { mutateAsync: resetPasswordMutation, isPending: isReset } =
    useMutation({
      mutationFn: resetPassword,
      onSuccess: () => {
        showSnackbar('비밀번호가 성공적으로 변경되었습니다.');
        route.push('/login');
      },
      onError: () => showSnackbar('비밀번호 초기화에 실패했습니다.', 'error'),
    });

  // STUB 비밀번호 초기화 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    resetPasswordMutation(updatePasswordData);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e);

    // 비밀번호가 변경될 때 비밀번호 확인 필드의 오류 메시지를 업데이트
    if (
      updatePasswordData.passwordConfirmation &&
      e.target.value !== updatePasswordData.passwordConfirmation
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
    if (e.target.value !== updatePasswordData.password) {
      setPasswordConfirmationError('비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordConfirmationError('');
    }
  };

  const requiredFields = Object.keys(initialValues);
  const hasDisabled =
    requiredFields.some(
      (field) => !changedFields[field as keyof typeof changedFields],
    ) ||
    requiredFields.some(
      (field) => errorMessage[field as keyof typeof errorMessage] !== '',
    ) ||
    updatePasswordData.password !== updatePasswordData.passwordConfirmation;

  return (
    <form onSubmit={handleSubmit}>
      <div className="auth_input-list">
        <InputField
          type="password"
          label="새 비밀번호"
          name="password"
          autoComplete="new-password"
          required
          onChange={handlePasswordChange}
          value={updatePasswordData.password}
          errorMessage={errorMessage.password}
          placeholder="비밀번호 (영문, 숫자 포함, 12자 이내)를 입력해주세요."
        />
        <InputField
          type="password"
          label="비밀번호 확인"
          name="passwordConfirmation"
          autoComplete="new-password"
          required
          onChange={handlePasswordConfirmationChange}
          value={updatePasswordData.passwordConfirmation}
          errorMessage={
            errorMessage.passwordConfirmation || passwordConfirmationError
          }
          placeholder="새 비밀번호를 다시 한번 입력해주세요."
        />
      </div>
      <Buttons
        type="submit"
        text="재설정"
        className="mt-pr-40"
        disabled={isReset || hasDisabled}
        loading={isReset}
      />
    </form>
  );
}
