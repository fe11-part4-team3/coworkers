'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';

import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import { createGroup } from '@/service/group.api';
import Profile from '@/components/Profile/Profile';
import useUser from '@/hooks/useUser';
import updatePayloadSubmit from '@/utils/updatePayload';
import Buttons from '@/components/Buttons';
import { useSnackbar } from '@/contexts/SnackBar.context';

// STUB 초기값
const INITIAL_VALUES = {
  name: '',
  image: '',
};

export default function AddTeamPage() {
  const { user, isPending, reload, groups } = useUser(true);

  const route = useRouter();

  const { showSnackbar } = useSnackbar();

  // STUB 팀 생성 폼 상태
  const {
    preview,
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    errorMessage,
    initialValues,
    resetForm,
  } = useForm(INITIAL_VALUES);

  // STUB 중복 팀 이름 체크
  const overlap = groups?.some(
    (group) => group.name.toLowerCase() === formData.name.toLowerCase(),
  );

  const [updateValidation, setUpdateValidation] = useState<boolean>(false);

  // STUB 변경사항에 따른 유효성 검사
  useEffect(() => {
    const isNameValid = !errorMessage.name;
    const isImageValid = !errorMessage.image;
    const hasNameChanged = !!changedFields.name && formData.name.trim() !== '';
    const isNotOverlapping = !overlap;

    setUpdateValidation(
      isNameValid && hasNameChanged && isNotOverlapping && isImageValid,
    );
  }, [errorMessage, changedFields, formData, overlap]);

  // STUB 팀 생성 mutation
  const { mutate: createTeamMutate, isPending: isCreatTeamPending } =
    useMutation({
      mutationFn: createGroup,
      onSuccess: (response) => {
        showSnackbar('팀 생성이 완료되었습니다.');
        route.push(`/${response.id}`);
        resetForm();
        reload();
      },
      onError: () => {
        showSnackbar('팀 생성에 실패했습니다. 다시 시도해주세요', 'error');
      },
    });

  // STUB 생성하기 버튼 클릭 시
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      await updatePayloadSubmit({
        changedFields: changedFields as Record<string, boolean>,
        formData,
        mutate: createTeamMutate,
      });
    },
    [changedFields, formData, createTeamMutate],
  );

  if (isPending && !user) {
    return <div>사용자 정보를 불러오는 중입니다...</div>;
  }

  if (!user) {
    return <div>로그인 상태가 아닙니다.</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="auth_input-list">
          <Profile
            label="팀 프로필"
            variant="group"
            onSelectFile={handleFileChange}
            isEdit={true}
            image={preview || initialValues.image}
            errorMessage={errorMessage.image}
          />

          <InputField
            label="팀 이름"
            value={formData.name}
            onChange={(e) => handleInputChange(e)}
            name="name"
            placeholder="팀 이름을 입력해주세요."
            errorMessage={overlap ? '중복된 팀 이름입니다.' : errorMessage.name}
          />
        </div>
        <Buttons
          type="submit"
          text="생성하기"
          className="mt-pr-40"
          disabled={!updateValidation || isCreatTeamPending}
          loading={isCreatTeamPending}
        />
      </form>
      <p className="mt-pr-24 text-center text-16 mo:text-14">
        팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요.
      </p>
    </>
  );
}
