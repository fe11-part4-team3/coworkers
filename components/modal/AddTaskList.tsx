'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import CloseIcon from '@/public/images/icon-close.svg';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '@/components/InputField/InputField';

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
          <form className="mt-pr-16">
            <InputField
              value=""
              placeholder="목록 명을 입력해주세요."
              name="task-list-title"
              onChange={() => {}}
            />
            <Button
              text="만들기"
              onClick={handleOnClick}
              color="primary"
              className="mt-pr-24 w-full"
            />
          </form>
        </div>
      </ModalBase>
    </>
  );
}
