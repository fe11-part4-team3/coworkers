'use client';

import { useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import { updateUser } from '@/service/user.api';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';

import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import Profile from '@/components/Profile/Profile';
import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import { uploadImage } from '@/service/image.api';
import { UpdateUserParams } from '@/types/user.type';

export default function MyPage() {
  // 사용자 정보 상태 및 초기화 함수
  const { user, clear, isPending, reload } = useUser(true);

  // 유저 정보 수정 폼 상태 및 변경 함수
  const { formData: userData, handleChange } = useForm({
    image: user?.image || '',
    nickname: user?.nickname || '',
  });

  const [preview, setPreview] = useState<File | null>(null);

  // 이미지 또는 닉네임 변화 감지 상태
  const [imageChanged, setImageChanged] = useState(false);
  const [nicknameChanged, setNicknameChanged] = useState(false);

  // 이미지 업로드 mutation
  const { mutateAsync: uploadImageAsync, isPending: isUploading } = useMutation(
    {
      mutationFn: (file: File) => uploadImage(file),
    },
  );

  // 사용자 정보 수정 요청
  const { mutate: patchUser, isPending: isPatching } = useMutation({
    mutationFn: (formData: UpdateUserParams) => updateUser(formData),
    onSuccess: () => {
      alert('사용자 정보 수정에 성공했습니다.');

      // 변경사항 초기화 및 사용자 정보 다시 불러오기
      setImageChanged(false);
      setNicknameChanged(false);
      reload();
    },
    onError: (err) => {
      alert('사용자 정보 수정에 실패했습니다.');
    },
  });

  // 실제 서버 수정 요청
  const handleSubmit = async () => {
    console.log('[handleSubmit] formData:', userData);

    // 1) patch에 보낼 payload (부분 업데이트)
    const payload: UpdateUserParams = {};

    // 2) 닉네임이 바뀌었는지
    if (nicknameChanged && userData.nickname !== user?.nickname) {
      payload.nickname = userData.nickname;
    }

    // 3) 이미지가 바뀌었다면 => 업로드 후 payload.image 세팅
    if (imageChanged && preview) {
      try {
        const uploadedUrl = await uploadImageAsync(preview);
        console.log('[handleSubmit] 업로드된 url:', uploadedUrl);

        payload.image = uploadedUrl;
      } catch (err) {
        alert('이미지 업로드에 실패했습니다.');
        return;
      }
    }

    // 4) payload가 비었으면 변경사항이 없는 것
    if (Object.keys(payload).length === 0) {
      console.log('[handleSubmit] 변경된 필드 없음 => patch 안 함');
      return;
    }

    // 5) 최종 patch
    patchUser(payload);
  };

  // 로그아웃 버튼 클릭 시
  const handleLogoutClick = () => {
    clear();
    alert('로그아웃 되었습니다.');
  };

  // 이미지 변경 핸들러
  const handleFileChange = (file: File) => {
    console.log('[handleFileChange] 파일 변경 감지:', file);

    setPreview(file);
    setImageChanged(true);
  };

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

  /*   TODO header에 붙어야하는 기능
  - 테스트 용으로 남김 (헤더 기능 추가 시 삭제)
  - 회원탈퇴 버튼 클릭 시 기능
  
  const route = useRouter();
  
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
  }; */

  if (isPending && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (!user) {
    return <div>로그인 상태가 아닙니다.</div>;
  }

  // 로그인 상태일 때
  return (
    <Container>
      {/* 프로필 이미지 */}
      <Profile
        variant="member"
        isEdit={true}
        onSelectFile={handleFileChange}
        defaultProfile={user.image}
      />

      {/* 닉네임 */}
      <InputField
        value={userData.nickname}
        placeholder={user.nickname}
        name="nickname"
        onChange={(e) => {
          handleChange(e);
          setNicknameChanged(true);
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

      {/* 로그아웃, 회원탈퇴, 저장하기 버튼 */}
      <div className="flex gap-pr-10">
        <Button type="button" onClick={handleLogoutClick}>
          로그아웃
        </Button>

        {/* TODO header에 붙어야하는 기능 - 테스트 용으로 남김 (헤더 기능 추가 시 삭제) */}
        {/* <Button type="button" onClick={handleUserDelete}>
          회원탈퇴
        </Button> */}

        {/* 프로필 이미지 또는 닉네임의 변경사항이 있을 경우 해당 버튼 노출 */}
        {(imageChanged || nicknameChanged) && (
          <Buttons
            type="submit"
            text="저장하기"
            bg="default"
            size="S"
            width="w-pr-100"
            onClick={() => handleSubmit()}
            disabled={isPatching || isUploading}
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
