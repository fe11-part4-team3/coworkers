'use client';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import Profile from '@/components/Profile/Profile';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import { useUserLogic } from '@/hooks/useUserLogic';

export default function MyPage() {
  const {
    user,
    isUserLoading,
    isUpdateUserPending,
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleUserDelete,
  } = useUserLogic();

  if (isUserLoading && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (!user) {
    return <div>로그인 상태가 아닙니다.</div>;
  }

  /*   TODO mypage 비밀번호 변경 기능 해야함 - 모달에서 진행
  - 비밀번호 변경 버튼 클릭 시 기능

  const { formData: passwordData, setFormData: setPasswordData } = useForm({
    passwordConfirmation: '',
    password: '',
  });

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
  }; */

  // 로그인 상태일 때
  return (
    <Container>
      {/* 프로필 이미지 */}
      <Profile
        variant="member"
        isEdit={true}
        onSelectFile={(file) => handleFileChange('image', file)}
        defaultProfile={user.image}
      />

      {/* 닉네임 */}
      <InputField
        value={formData.nickname}
        placeholder={user.nickname}
        name="nickname"
        onChange={(e) => {
          handleInputChange(e);
        }}
        label="이름"
      />

      {/* 이메일 */}
      <InputField
        type="email"
        value={user.email}
        placeholder={user.email}
        name="email"
        disabled={true}
        label="이메일"
      />

      {/* 비밀번호 */}
      <InputField
        type="password"
        value="password"
        name="password"
        placeholder="******"
        onClickButton={() => alert('비밀번호 변경 모달이 열립니다.')}
        disabled={true}
        label="비밀번호"
      />

      {/* 회원탈퇴, 저장하기 버튼 */}
      <div className="flex gap-pr-10">
        <Button type="button" onClick={handleUserDelete}>
          회원탈퇴
        </Button>

        {/* 프로필 이미지 또는 닉네임의 변경사항이 있을 경우 해당 버튼 노출 */}
        {(changedFields.image || changedFields.nickname) && (
          <Buttons
            type="submit"
            text="저장하기"
            size="S"
            width="w-pr-100"
            onClick={handleSubmit}
            disabled={isUpdateUserPending}
          />
        )}
      </div>

      {/* TODO mypage 패스워드 변경 해야함 - 모달에서 진행 */}
      {/* <div>
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
      <Button type="submit">비밀번호 변경</Button> */}
    </Container>
  );
}
