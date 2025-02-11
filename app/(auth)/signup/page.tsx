'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';

import { signUp } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useUser from '@/hooks/useUser';

function SignupPage() {
  const { formData, handleInputChange, errorMessage } = useForm({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const { user } = useUser();

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

  useEffect(() => {
    if (user?.memberships) {
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
        disabled={
          isSignup ||
          !(
            errorMessage.email === '' &&
            errorMessage.nickname === '' &&
            errorMessage.password === '' &&
            errorMessage.passwordConfirmation === ''
          )
        }
        loading={isSignup}
      />
    </form>
  );
}

export default SignupPage;
