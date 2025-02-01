'use client';

import { useMutation } from '@tanstack/react-query';

import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';
import { acceptInvitation } from '@/service/group.api';

// REVIEW 기능 테스트 전 입니다
export default function JoinTeamPage() {
  const { user } = useUser(true);

  const { formData, handleInputChange, errorMessage } = useForm({
    userEmail: user?.email || '',
    token: '',
  });

  const { mutateAsync: postJoinGroup, isPending: isJoinGroup } = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: () => {
      console.log('팀 참여 성공');
    },
    onError: (error) => console.error('팀 참여 실패:', error),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 팀 가입 요청
    postJoinGroup(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          value={formData.token}
          label="팀 링크"
          placeholder="팀 링크를 입력해주세요."
          name="token"
          onChange={handleInputChange}
          errorMessage={errorMessage.token}
        />
        <Buttons
          text="참여하기"
          className="mt-pr-40"
          disabled={!(errorMessage.token === '')}
          loading={isJoinGroup}
          type="submit"
        />
      </form>
      <p className="mt-pr-24 text-center text-16 mo:text-14">
        공유받은 팀 링크를 입력해 참여할 수 있어요.
      </p>
    </>
  );
}
