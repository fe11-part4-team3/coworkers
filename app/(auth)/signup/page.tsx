'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { signUp } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';

function SignupPage() {
  const initialValues = {
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  };

  const { formData, handleInputChange, changedFields, errorMessage } =
    useForm(initialValues);

  const route = useRouter();

  // 인증된 사용자인지 확인
  const { isAuthenticated } = useUser();

  const { mutateAsync: postSignup, isPending: isSignup } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      alert('회원가입이 완료 되었습니다.');
      console.log('회원가입 성공');
      route.push('/login');
    },
    onError: () => console.log('회원가입 실패'),
  });

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    postSignup(formData);
  };

  useEffect(() => {
    if (isAuthenticated) {
      route.push('/');
    }
  }, [isAuthenticated, route]);

  const requiredFields = Object.keys(initialValues);

  const hasDisabled =
    requiredFields.some(
      (field) => !changedFields[field as keyof typeof changedFields],
    ) ||
    requiredFields.some(
      (field) => errorMessage[field as keyof typeof errorMessage] !== '',
    );

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
          onChange={handleInputChange}
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
          onChange={handleInputChange}
          errorMessage={errorMessage.passwordConfirmation}
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
