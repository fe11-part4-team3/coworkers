'use client';

import useModalStore from '@/stores/modalStore';
import ModalButton from '@/components/ModalButton';
import CloseIcon from '@/public/images/icon-close.svg';
import { useClickOutside } from '@/utils/useClickOutside';

/**
 * 할 일 목록 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일 목록을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 목록 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTaskList({
  onClick,
}: {
  onClick: () => void;
}) {
  const { isOpen, closeModal } = useModalStore();

  const ref = useClickOutside({
    callback: closeModal,
    isOpen,
  });

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute flex h-pr-235 w-pr-380 flex-col items-center justify-between rounded-xl bg-popover pb-pr-32 font-medium"
    >
      <div className="relative flex w-full flex-col items-center gap-pr-16 pt-pr-48">
        <CloseIcon
          width={20}
          height={20}
          fill="#fff"
          className="absolute right-pr-16 top-pr-16 cursor-pointer"
          onClick={closeModal}
        />
        <h2 className="text-lg text-t-primary">
          할 일 목록
        </h2>
        {/* input 컴포넌트 제작 전 임시로 그냥 input으로 대체 */}
        <input />
      </div>
      <ModalButton
        text="만들기"
        onClick={handleOnClick}
        color="primary"
      />
    </div>
  );
}
