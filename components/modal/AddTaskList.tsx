'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import CloseIcon from '@/public/images/icon-close.svg';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 할 일 목록 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일 목록을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 목록 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTaskList({ onClick }: { onClick: () => void }) {
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
          <div className="text-center">
            <h2 className="text-18 text-t-primary">할 일 목록</h2>
          </div>
          <div className="mb-pr-24 mt-pr-16">
            {/* input 컴포넌트 제작 전 임시로 그냥 input으로 대체 */}
            <input className="w-full" />
          </div>
        </div>
        <Button
          text="만들기"
          onClick={handleOnClick}
          color="primary"
          className="w-full"
        />
      </ModalBase>
    </>
  );
}
