'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { deleteUser, updateUser } from '@/service/user.api';
import updatePayloadSubmit from '@/utils/updatePayload';
import useUser from '@/hooks/useUser';
import useForm from '@/hooks/useForm';
import Buttons from '@/components/Buttons';
import { Button } from '@/components/ui/button';
import Profile from '@/components/Profile/Profile';
import Container from '@/components/layout/Container';
import InputField from '@/components/InputField/InputField';
import useModalStore from '@/stores/modalStore';
import ChangePassword from '@/components/modal/ChangePassword';

interface initialValues {
  nickname: string;
  [key: string]: string | File;
}

export default function MyPage() {
  const { user, isPending: isUserLoading, clear, reload } = useUser(true);
  const { openModal } = useModalStore();

  // STUB 유저 정보 초기값
  const initialValues = {
    image: user?.image || '',
    nickname: user?.nickname || '',
  };

  // STUB 유저 수정 폼 상태
  const {
    preview,
    formData,
    errorMessage,
    changedFields,
    handleInputChange,
    handleFileChange,
    setChangedFields,
    initialValues: initialUserValues,
  } = useForm<initialValues>(initialValues);

  // STUB 유효성 검사에 따라 버튼 활성화 여부 상태
  const [updateValidation, setUpdateValidation] = useState<boolean>(false);

  // STUB 초기값을 이용한 변경사항 검사
  useEffect(() => {
    // 닉네임 에러메세지 노출 여부
    const isNicknameValid = !errorMessage.nickname;
    // 이미지 변경 여부
    const hasImageChanged = !!changedFields.image;
    // 닉네임이 변경되고, 초기값과 같지 않을때
    const hasNicknameChanged =
      changedFields.nickname &&
      formData.nickname !== initialUserValues.nickname;

    // 최종 유효성 검사에 따른 버튼 활성화 상태 담기
    setUpdateValidation(
      !!(isNicknameValid && (hasImageChanged || hasNicknameChanged)),
    );
  }, [errorMessage, changedFields, formData, initialUserValues]);

  // STUB 사용자 정보 수정 api 호출
  const { mutate: updateUserMutate, isPending: isUpdateUserPending } =
    useMutation({
      mutationFn: updateUser,
      onSuccess: () => {
        alert('사용자 정보 수정에 성공했습니다.');
        reload();
        setChangedFields({ image: false, nickname: false });
      },
      onError: () => alert('사용자 정보 수정에 실패했습니다.'),
    });

  // STUB 회원 탈퇴 api 호출
  const { mutate: deleteUserMutate } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      alert('회원탈퇴가 완료되었습니다.');
      clear();
    },
    onError: () => alert('회원탈퇴에 실패했습니다.'),
  });

  // STUB 회원탈퇴 버튼 클릭 시
  const handleSubmitUserDelete = async () => {
    const confirm = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
    if (confirm) deleteUserMutate();
  };

  // STUB 수정 버튼 클릭 시
  const handleSubmit = useCallback(async () => {
    await updatePayloadSubmit({
      changedFields: changedFields as Record<string, boolean>,
      formData,
      mutate: updateUserMutate,
    });
  }, [changedFields, formData, updateUserMutate]);

  // STUB 비밀번호 변경 모달 열기
  const handleOpenResetPassword = (e: MouseEvent) => {
    e.preventDefault();
    openModal(<ChangePassword />);
  };

  if (isUserLoading && !user) {
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
        isEdit={true}
        variant="member"
        image={preview || user.image}
        onSelectFile={handleFileChange}
      />

      {/* 닉네임 */}
      <InputField
        label="이름"
        name="nickname"
        value={formData.nickname}
        placeholder={user.nickname}
        errorMessage={errorMessage.nickname}
        onChange={handleInputChange}
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
        onClickButton={(e) => handleOpenResetPassword(e)}
        disabled={true}
        label="비밀번호"
      />

      {/* 회원탈퇴, 저장하기 버튼 */}
      <div className="flex gap-pr-10">
        <Button type="button" onClick={handleSubmitUserDelete}>
          회원탈퇴
        </Button>

        {/* 프로필 이미지 또는 닉네임의 변경사항이 있을 경우 해당 버튼 노출 */}
        {updateValidation && (
          <Buttons
            type="submit"
            text="저장하기"
            size="S"
            width="w-pr-100"
            onClick={handleSubmit}
            disabled={!updateValidation || isUpdateUserPending}
            loading={isUpdateUserPending}
          />
        )}
      </div>
    </Container>
  );
}
