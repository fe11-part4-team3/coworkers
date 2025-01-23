'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { deleteUser, updatePassword } from '@/service/user.api';
import Container from '@/components/layout/Container';
import useForm from '@/hooks/useForm';
import { Button } from '@/components/ui/button';
import useUser from '@/hooks/useUser';

export default function MyPage() {
  const { formData, handleChange, setFormData } = useForm({
    passwordConfirmation: '',
    password: '',
  });

  // 사용자 정보 상태 및 초기화 함수
  const { user, clear } = useUser(true);
  const [error, setError] = useState<string | null>(null);
  const route = useRouter();

  // 로그아웃 버튼 클릭 시
  const handleSubmitLogout = () => {
    clear();
    alert('로그아웃 되었습니다.');
  };

  // 회원탈퇴 버튼 클릭 시
  const handleUserDelete = async () => {
    const confirm = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
    if (confirm) {
      // 회원탈퇴 요청
      try {
        const response = await deleteUser();
        if (!response) return;
        alert('회원탈퇴가 완료되었습니다.');

        // 로그아웃 처리
        route.push('/');
      } catch (err) {
        console.error('회원탈퇴 실패:', err);
        alert('회원탈퇴에 실패했습니다.');
      }
    }
  };

  // 비밀번호 변경 버튼 클릭 시
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 비밀번호 변경 요청
    try {
      const response = await updatePassword(formData);
      if (!response) return;
      alert('패스워드가 변경 되었습니다.');

      setFormData({
        passwordConfirmation: '',
        password: '',
      });
      clear();

      route.push('/login');
    } catch (err) {
      console.error('회원탈퇴 실패:', err);
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  // 로그인 상태일 때
  return (
    <Container>
      <div>환영합니다. {user?.nickname} 님!</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            변경할 비밀번호:
            <input
              type="password"
              name="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            변경할 비밀번호 확인:
            <input
              type="password"
              name="passwordConfirmation"
              autoComplete="new-password"
              value={formData.passwordConfirmation}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button type="submit">비밀번호 변경</Button>
      </form>
      <div className="flex gap-pr-10">
        <Button type="submit" onClick={handleSubmitLogout}>
          로그아웃
        </Button>
        <Button type="button" onClick={handleUserDelete}>
          회원탈퇴
        </Button>
      </div>
    </Container>
  );
}
