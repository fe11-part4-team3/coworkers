'use client';

import useModalStore from '@/stores/modalStore';
import CloseIcon from '@/public/images/icon-close.svg';
import ModalBase from '@/components/modal/ModalBase';
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
      <ModalBase className="px-pr-52 pt-pr-48">
        <div className="w-full">
          <CloseIcon
            width={20}
            height={20}
            className="absolute right-pr-16 top-pr-16 cursor-pointer"
            onClick={closeModal}
          />
          <div className="mb-pr-40 text-center">
            <h2 className="mb-pr-8 text-18 text-t-primary">멤버 초대</h2>
            <p className="text-14 text-t-secondary">
              그룹에 참여할 수 있는 링크를 복사합니다.
            </p>
          </div>
        </div>
        <Buttons text="링크 복사하기" size="XL" onClick={handleOnClick} />
      </ModalBase>
    </>
  );
}
