'use client';

import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';
import { acceptInvitation } from '@/service/group.api';
import { useSnackbar } from '@/contexts/SnackBar.context';

export default function JoinTeamPage() {
  const { user, reload } = useUser(true);
  const { showSnackbar } = useSnackbar();

  const params = useSearchParams();
  const joinToken = params.get('token');

  const route = useRouter();

  const { formData, handleInputChange, errorMessage } = useForm({
    userEmail: user?.email || '',
    token: joinToken || '',
  });

  const { mutateAsync: postJoinGroup, isPending: isJoinGroup } = useMutation({
    mutationFn: acceptInvitation,
    onSuccess: (groupId) => {
      showSnackbar('팀 참여가 완료되었습니다.');
      reload();
      route.push(`/${groupId}`);
    },
    onError: () => showSnackbar('팀 참여에 실패 하였습니다.', 'error'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 팀 가입 요청
    postJoinGroup(formData);
  };

  useEffect(() => {
    if (!user) {
      // FIXME 로그인 후 이용해주세요 스낵바 두번 호출(useUser 리팩토링 후 테스트 필요)
      showSnackbar('로그인 후 이용해주세요.', 'error');
      route.push(
        `/login?redirect=${encodeURIComponent(window.location.pathname + window.location.search)}`,
      );
    }
  }, [joinToken]);

  if (!user) return null;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputField
          value={joinToken || ''}
          label="팀 링크"
          placeholder="팀 링크를 입력해주세요."
          name="token"
          onChange={handleInputChange}
          errorMessage={errorMessage.token}
          disabled={true}
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
