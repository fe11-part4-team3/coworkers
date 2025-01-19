'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 비밀번호 변경 모달 컴포넌트.
 * 변경하기 버튼 클릭 시 비밀번호 변경 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (비밀번호 변경 기능을 처리하는 함수 전달해주세요.)
 */

export default function ChangePassword({ onClick }: { onClick: () => void }) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <ModalBase className="px-pr-52 pt-pr-48">
        <div className="w-full">
          <div className="text-center">
            <h2 className="mb-pr-8 text-18 text-t-primary">
              비밀번호 변경하기
            </h2>
          </div>
          <div className="mb-pr-24 mt-pr-16">
            {/* input 컴포넌트 제작 전 임시로 그냥 input으로 대체 */}
            <input className="w-full" />
          </div>
          <div className="flex items-center justify-between gap-pr-8">
            <Button
              text="닫기"
              onClick={closeModal}
              color="primaryReverse"
              className="w-1/2"
            />
            <Button
              text="변경하기"
              onClick={handleOnClick}
              color="primary"
              className="w-1/2"
            />
          </div>
        </div>
      </ModalBase>
    </>
  );
}
