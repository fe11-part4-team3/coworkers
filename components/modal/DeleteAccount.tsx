'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import DangerIcon from '@/public/images/icon-danger.svg';

/**
 * 회원 탈퇴 모달 컴포넌트.
 * 회원 탈퇴 버튼 클릭 시 회원 탈퇴 기능을 제공합니다.
 */
export default function DeleteAccount({
  onClick,
  isPending,
}: {
  onClick: () => void;
  isPending: boolean;
}) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
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
          onClick={() => handleOnClick()}
          backgroundColor="danger"
          loading={isPending}
        />
      </div>
    </>
  );
}
