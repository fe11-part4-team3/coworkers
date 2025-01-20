'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import CloseIcon from '@/public/images/icon-close.svg';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '@/components/InputField/InputField';

/**
 * 팀 추가 모달 컴포넌트.
 * 추가하기 버튼 클릭 시 팀 추가 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (팀 추가 기능을 처리하는 함수 전달해주세요.)
 */

export default function AddTeam({ onClick }: { onClick: () => void }) {
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
            <h2 className="text-18 text-t-primary">팀 이름</h2>
          </div>
          <form className="mt-pr-16">
            <InputField
              value=""
              placeholder="팀 이름을 입력해주세요."
              name="team-name"
              onChange={() => {}}
            />
            <Button
              text="추가하기"
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
