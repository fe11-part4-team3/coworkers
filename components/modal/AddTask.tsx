'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 할 일 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTask({ onClick }: { onClick: () => void }) {
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
            <h2 className="mb-pr-8 text-18 text-t-primary">할 일 만들기</h2>
            <p className="text-14 text-t-secondary">
              할 일은 실제로 행동 가능한 작업 중심으로 <br />
              작성해주시면 좋습니다.
            </p>
          </div>
          <div className="mb-pr-24 mt-pr-16">
            {/* input 컴포넌트 제작 전 임시로 그냥 input으로 대체 */}
            <input className="w-full" />
          </div>
          <Button
            text="만들기"
            onClick={handleOnClick}
            color="primary"
            className="w-full"
          />
        </div>
      </ModalBase>
    </>
  );
}
