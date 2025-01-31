'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState, useCallback } from 'react';

import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Container from '@/components/layout/Container';
import { createGroup } from '@/service/group.api';
import Profile from '@/components/Profile/Profile';
import useUser from '@/hooks/useUser';
import updatePayloadSubmit from '@/utils/updatePayload';
import Buttons from '@/components/Buttons';

// STUB 초기값
const INITIAL_VALUES = {
  name: '',
  image: '',
};

export default function AddTeamPage() {
  const { user, isPending, reload, groups } = useUser(true);

  const route = useRouter();

  // STUB 팀 생성 폼 상태
  const {
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
    const hasNameChanged = !!changedFields.name && formData.name.trim() !== '';
    const isNotOverlapping = !overlap;

    setUpdateValidation(isNameValid && hasNameChanged && isNotOverlapping);
  }, [errorMessage, changedFields, formData, overlap]);

  // STUB 팀 생성 mutation
  const { mutate: createTeamMutate, isPending: isCreatTeamPending } =
    useMutation({
      mutationFn: createGroup,
      onSuccess: (response) => {
        alert('팀 생성이 완료되었습니다');
        console.log('팀 생성이 완료되었습니다', response);
        route.push(`/${response.id}`);
        resetForm();
        reload();
      },
      onError: () => {
        alert('팀 생성에 실패했습니다');
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
    <Container>
      <h1>팀생성</h1>
      <form onSubmit={handleSubmit}>
        <Profile
          variant="group"
          onSelectFile={handleFileChange}
          isEdit={true}
          image={initialValues.image}
        />

        <InputField
          label="팀 이름"
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          name="name"
          placeholder="팀 이름을 입력해주세요."
          errorMessage={overlap ? '중복된 팀 이름입니다.' : errorMessage.name}
        />
        <Buttons
          type="submit"
          text="생성하기"
          disabled={!updateValidation || isCreatTeamPending}
          loading={isCreatTeamPending}
        />
      </form>
    </Container>
  );
}
