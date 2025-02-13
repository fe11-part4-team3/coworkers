'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import DangerIcon from '@/public/images/icon-danger.svg';

interface DeleteTaskListModal {
  onDelete: () => void;
}

export default function DeleteTaskListModal({ onDelete }: DeleteTaskListModal) {
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
        <h2 className="modal-title">목록 삭제를 진행하시겠어요?</h2>
        <p className="modal-subTitle">
          할 일 목록이 삭제되고, <br />
          목록에 존재하던 모든 할 일도 삭제됩니다.
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
          text="삭제"
          onClick={() => handleOnClick()}
          backgroundColor="danger"
        />
      </div>
    </>
  );
}
