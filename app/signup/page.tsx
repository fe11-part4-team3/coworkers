'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { signUp } from '@/service/auth.api';
import useForm from '@/hooks/useForm';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';

function SignupPage() {
  const { formData, handleChange } = useForm({
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
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            이름:
            <input
              type="text"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              required
            />
          </label>
        </div>
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
        <div>
          <label>
            비밀번호 확인:
            <input
              type="password"
              name="passwordConfirmation"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">회원가입</Button>
      </form>
    </Container>
  );
}

export default SignupPage;
