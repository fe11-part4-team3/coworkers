'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 목록 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 목록을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (목록 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddList({ onClick }: { onClick: () => void }) {
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
            <h2 className="mb-pr-8 text-18 text-t-primary">새로운 목록 추가</h2>
            <p className="text-14 text-t-secondary">
              할 일에 대한 목록을 추가하고 <br />
              목록별 할 일을 만들 수 있습니다.
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
