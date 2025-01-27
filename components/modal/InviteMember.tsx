'use client';

import useModalStore from '@/stores/modalStore';
import CloseButton from '@/components/modal/ModalCloseButton';
import Buttons from '@/components/Buttons';

/**
 * 멤버 초대 모달 컴포넌트.
 * 그룹에 참여할 수 있는 링크를 복사하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (링크 복사 기능을 처리하는 함수 전달해주세요.)
 */

export default function InviteMember({ onClick }: { onClick: () => void }) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">멤버 초대</h2>
        <p className="modal-subTitle">
          그룹에 참여할 수 있는 링크를 복사합니다.
        </p>
      </div>
      <div className="modal-button-wrapper">
        <Buttons text="링크 복사하기" onClick={handleOnClick} />
      </div>
    </>
  );
}
