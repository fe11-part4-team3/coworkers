'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import DangerIcon from '@/public/images/icon-danger.svg';

interface DeleteMemberModalProps {
  onDelete: () => void;
}

export default function DeleteMemberModal({
  onDelete,
}: DeleteMemberModalProps) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => onDelete();

  return (
    <>
      <DangerIcon
        width={24}
        height={24}
        className="mx-auto mb-pr-16"
        onClick={closeModal}
      />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">멤버 삭제를 진행하시겠어요?</h2>
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
          text="삭제"
          onClick={() => handleOnClick()}
          backgroundColor="danger"
        />
      </div>
    </>
  );
}
