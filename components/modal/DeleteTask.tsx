'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';
import DangerIcon from '@/public/images/icon-danger.svg';

/**
 * 할 일 삭제 모달 컴포넌트.
 * 삭제하기 버튼 클릭 시 할 일 삭제 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 삭제 기능을 처리하는 함수 전달해주세요.)
 */

export default function DeleteTask({
  onClick,
  title,
}: {
  onClick: () => void;
  title: string;
}) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <ModalBase className="px-pr-52 pt-pr-40">
        <div className="w-full">
          <DangerIcon
            width={24}
            height={24}
            className="mx-auto mb-pr-16"
            onClick={closeModal}
          />
          <div className="mb-pr-24 text-center">
            <h2 className="mb-pr-8 text-18 text-t-primary">
              '{title}' <br />할 일을 정말 삭제하시겠어요?
            </h2>
            <p className="text-14 text-t-secondary">
              삭제 후에는 되돌릴 수 없습니다.
            </p>
          </div>
          <div className="flex items-center justify-between gap-pr-8">
            <Button
              text="닫기"
              onClick={closeModal}
              color="dangerReverse"
              className="w-1/2"
            />
            <Button
              text="삭제하기"
              onClick={handleOnClick}
              color="danger"
              className="w-1/2"
            />
          </div>
        </div>
      </ModalBase>
    </>
  );
}
