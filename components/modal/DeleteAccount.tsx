'use client';

import { useMutation } from '@tanstack/react-query';
import { signOut, useSession } from 'next-auth/react';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import DangerIcon from '@/public/images/icon-danger.svg';
import { deleteUser } from '@/service/user.api';
import useUser from '@/hooks/useUser';
import { revokeGoogleAccess, revokeKakaoAccess } from '@/service/auth.api';
import { removeLoginProcessed, removeProfileUpdated } from '@/lib/kakaoStorage';

/**
 * 회원 탈퇴 모달 컴포넌트.
 * 회원 탈퇴 버튼 클릭 시 회원 탈퇴 기능을 제공합니다.
 */
export default function DeleteAccount() {
  const { clear } = useUser();
  const { closeModal } = useModalStore();
  const session = useSession();

  // STUB 회원 탈퇴 api mutate
  const { mutate: deleteUserMutate, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      removeProfileUpdated();
      removeLoginProcessed();
      alert('회원탈퇴가 완료되었습니다.');
      clear();
    },
    onError: () => alert('회원탈퇴에 실패했습니다.'),
  });

  const handleDeleteAccount = async () => {
    // STUB 회원 탈퇴 api 호출
    deleteUserMutate();
    closeModal();

    // STUB 구글 연동 해제
    if (session.data?.googleAccessToken) {
      await revokeGoogleAccess(session.data.googleAccessToken);
    }

    // STUB 카카오 연동 해제
    if (session.data?.kakaoAccessToken) {
      await revokeKakaoAccess(session.data?.kakaoAccessToken);
    }

    // STUB 세션 로그아웃
    await signOut({ redirect: false });
  };

  return (
    <>
      <DangerIcon
        width={24}
        height={24}
        className="mx-auto mb-pr-16"
        onClick={closeModal}
      />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">회원 탈퇴를 진행하시겠어요?</h2>
        <p className="modal-subTitle">
          그룹장으로 있는 그룹은 자동으로 삭제되고, <br />
          모든 그룹에서 나가집니다.
        </p>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="secondary"
          backgroundColor="white"
          textColor="default"
        />
        <Buttons
          text="회원 탈퇴"
          onClick={() => handleDeleteAccount()}
          backgroundColor="danger"
          loading={isPending}
        />
      </div>
    </>
  );
}
