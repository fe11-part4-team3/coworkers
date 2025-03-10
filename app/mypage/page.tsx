'use client';

import { useCallback, useEffect, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

import { deleteUser, updateUser } from '@/service/user.api';
import updatePayloadSubmit from '@/utils/updatePayload';
import useUser from '@/hooks/useUser';
import useForm from '@/hooks/useForm';
import Buttons from '@/components/Buttons';
import Profile from '@/components/Profile/Profile';
import Container from '@/components/layout/Container';
import InputField from '@/components/InputField/InputField';
import useModalStore from '@/stores/modalStore';
import DeleteAccount from '@/components/modal/DeleteAccount';
import { useSnackbar } from '@/contexts/SnackBar.context';
import { removeLoginProcessed, removeProfileUpdated } from '@/lib/kakaoStorage';
import { revokeGoogleAccess, revokeKakaoAccess } from '@/service/auth.api';

interface initialValues {
  nickname: string;
  [key: string]: string | File;
}

export default function MyPage() {
  const { user, reload, clear } = useUser(true);
  const { openModal } = useModalStore();
  const { data: session, status } = useSession();

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

  const { showSnackbar } = useSnackbar();

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
        showSnackbar('수정이 완료 되었습니다.');
        reload();
        setChangedFields('image', false);
        setChangedFields('nickname', false);
      },
      onError: () =>
        showSnackbar('수정에 실패 했습니다. 다시 시도해주세요.', 'error'),
    });

  // STUB 수정 버튼 클릭 시
  const handleSubmit = useCallback(async () => {
    await updatePayloadSubmit({
      changedFields: changedFields as Record<string, boolean>,
      formData,
      mutate: updateUserMutate,
    });
  }, [changedFields, formData, updateUserMutate]);

  // STUB 회원 탈퇴 api mutate
  const { mutate: deleteUserMutate, isPending: deletePending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeProfileUpdated();
      removeLoginProcessed();
      showSnackbar('회원탈퇴가 완료되었습니다.');
      clear();
    },
    onError: () => showSnackbar('회원탈퇴에 실패했습니다.', 'error'),
  });

  const handleDeleteAccount = async () => {
    // STUB 회원 탈퇴 api 호출
    deleteUserMutate();

    // STUB 구글 연동 해제
    if (session?.googleAccessToken) {
      await revokeGoogleAccess(session.googleAccessToken);
    }

    // STUB 카카오 연동 해제
    if (session?.kakaoAccessToken) {
      await revokeKakaoAccess(session?.kakaoAccessToken);
    }

    // STUB 세션 로그아웃
    await signOut({ redirect: false });
  };

  // STUB 회원탈퇴 모달 열기
  const handleUserDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    openModal(
      <DeleteAccount onClick={handleDeleteAccount} isPending={deletePending} />,
    );
  };

  // 로그인 상태일 때
  return (
    <Container>
      <div className="mx-auto w-pr-842 pt-pr-40 tamo:w-full tamo:pt-pr-24">
        <h1 className="mb-pr-24 text-20b">계정 설정</h1>
        <div className="auth_input-list">
          {/* 프로필 이미지 */}
          <Profile
            isEdit={true}
            variant="member"
            image={preview || user?.image}
            onSelectFile={handleFileChange}
            errorMessage={errorMessage.image}
          />

          {/* 닉네임 */}
          <InputField
            label="닉네임"
            name="nickname"
            value={formData.nickname}
            placeholder={user?.nickname}
            errorMessage={errorMessage.nickname}
            onChange={handleInputChange}
          />

          {/* 이메일 */}
          <InputField
            type="email"
            value={user?.email}
            placeholder={user?.email}
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
            disabled={true}
            label="비밀번호"
            sesstionStatus={status}
          />
        </div>

        {/* 회원탈퇴, 저장하기 버튼 */}
        <div className="mt-pr-24 flex items-center justify-between">
          <button
            type="button"
            onClick={(e) => handleUserDelete(e)}
            className="flex items-center justify-center gap-pr-8 text-16m text-s-danger"
          >
            <Image
              src="/images/icon-secession.svg"
              alt="회원탈퇴"
              width={24}
              height={24}
            />
            회원 탈퇴하기
          </button>

          {/* 프로필 이미지 또는 닉네임의 변경사항이 있을 경우 해당 버튼 노출 */}
          {updateValidation && (
            <Buttons
              type="submit"
              text="저장하기"
              className="w-pr-100"
              backgroundColor="none"
              textColor="primary"
              border="primary"
              size="M"
              onClick={handleSubmit}
              disabled={!updateValidation || isUpdateUserPending}
              loading={isUpdateUserPending}
            />
          )}
        </div>
      </div>
    </Container>
  );
}
