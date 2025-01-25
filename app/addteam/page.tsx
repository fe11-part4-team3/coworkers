'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

import useForm from '@/hooks/useForm';
import InputField from '@/components/InputField/InputField';
import Container from '@/components/layout/Container';
import { Button } from '@/components/ui/button';
import { createGroup } from '@/service/group.api';
import Profile from '@/components/Profile/Profile';
import useUser from '@/hooks/useUser';
import updatePayloadSubmit from '@/utils/updatePayload';

export default function AddTeamPage() {
  const initaialValues = {
    name: '',
    image: '',
  };

  const {
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    initialValues: initialTeamValues,
  } = useForm(initaialValues);

  const { user, isPending, reload } = useUser(true);

  const route = useRouter();

  const { mutate: creatTeamMutate } = useMutation({
    mutationFn: createGroup,
    onSuccess: (response) => {
      alert('팀 생성이 완료되었습니다');
      console.log('팀 생성이 완료되었습니다', response);
      route.push(`/${response.id}`);
      reload();
    },
    onError: () => {
      alert('팀 생성에 실패했습니다');
    },
  });

  // STUB 폼 제출
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await updatePayloadSubmit({
      changedFields: changedFields as Record<string, boolean>,
      formData,
      mutate: creatTeamMutate,
    });
  };

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
          onSelectFile={(file) => handleFileChange('image', file)}
          isEdit={true}
          defaultProfile={initialTeamValues.image}
        />

        <InputField
          value={formData.name}
          onChange={(e) => handleInputChange(e)}
          name="name"
          placeholder="팀 이름을 입력해주세요."
        />
        <Button type="submit">생성하기</Button>
      </form>
    </Container>
  );
}
