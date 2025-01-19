'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 로그아웃 모달 컴포넌트.
 * 로그아웃 버튼 클릭 시 로그아웃 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (로그아웃 기능을 처리하는 함수 전달해주세요.)
 */

export default function Logout({ onClick }: { onClick: () => void }) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <ModalBase className="px-pr-52 pt-pr-48">
        <div className="w-full">
          <div className="mb-pr-24 text-center">
            <h2 className="text-18 text-t-primary">로그아웃 하시겠어요?</h2>
          </div>
          <div className="flex items-center justify-between gap-pr-8">
            <Button
              text="닫기"
              onClick={closeModal}
              color="dangerReverse"
              className="w-1/2"
            />
            <Button
              text="로그아웃"
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
