'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { signUp } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import Container from '@/components/layout/Container';
import useUser from '@/hooks/useUser';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';

function SignupPage() {
  const { formData, handleInputChange, errorMessage } = useForm({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const [error, setError] = useState<string | null>(null);

  const route = useRouter();

  // 인증된 사용자인지 확인
  const { isAuthenticated } = useUser();

  // 회원가입 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 회원가입 요청
    try {
      const response = await signUp(formData);
      // TODO : 테스트 코드
      console.log('회원가입 성공:', response);
      alert('회원가입이 완료되었습니다!');

      route.push('/login');
    } catch (err) {
      // TODO : 테스트 코드
      console.error('회원가입 실패:', err);
      setError('회원가입 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      route.push('/');
    }
  }, [isAuthenticated, route]);

  return (
    <Container>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        <InputField
          label="이름"
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleInputChange}
          errorMessage={errorMessage.nickname}
          placeholder="이름을 입력해주세요."
          required
        />

        <InputField
          label="이메일"
          type="email"
          name="email"
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
          value={formData.passwordConfirmation}
          onChange={handleInputChange}
          errorMessage={errorMessage.passwordConfirmation}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Buttons
          text="회원가입"
          type="submit"
          disabled={
            !(
              errorMessage.email === '' &&
              errorMessage.nickname === '' &&
              errorMessage.password === '' &&
              errorMessage.passwordConfirmation === ''
            )
          }
        />
      </form>
    </Container>
  );
}

export default SignupPage;
