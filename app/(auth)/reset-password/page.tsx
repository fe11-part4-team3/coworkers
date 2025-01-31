'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { resetPassword } from '@/service/user.api';
import useForm from '@/hooks/useForm';
// import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';

/**
 * STUB 비밀번호 초기화 페이지
 */
export default function ResetPasswordPage() {
  // STUB 비밀번호 초기화 토큰 가져오기
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

  // STUB 비밀번호 초기화 폼
  const {
    formData: updatePasswordData,
    handleInputChange: handlePasswordChange,
    errorMessage,
  } = useForm({
    password: '',
    passwordConfirmation: '',
    token: '',
  });

  const route = useRouter();

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
        alert('비밀번호가 성공적으로 변경되었습니다.');
        route.push('/login');
      },
      onError: (error) => console.error('비밀번호 초기화 실패:', error),
    });

  // STUB 비밀번호 초기화 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    resetPasswordMutation(updatePasswordData);
  };

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
          onChange={handlePasswordChange}
          value={updatePasswordData.passwordConfirmation}
          errorMessage={errorMessage.passwordConfirmation}
          placeholder="새 비밀번호를 다시 한번 입력해주세요."
        />
      </div>
      <Buttons
        type="submit"
        text="재설정"
        className="mt-pr-40"
        disabled={
          isReset ||
          !(
            errorMessage.password === '' &&
            errorMessage.passwordConfirmation === ''
          )
        }
        loading={isReset}
      />
    </form>
  );
}
