'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '../InputField/InputField';

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
          <form className="mt-pr-16">
            <div className="flex flex-col gap-pr-16">
              <InputField
                value=""
                placeholder="새 비밀번호를 입력해주세요."
                label="새 비밀번호"
                name="new-password"
                onChange={() => {}}
              />
              <InputField
                value=""
                placeholder="새 비밀번호를 다시 한 번 입력해주세요."
                label="새 비밀번호 확인"
                name="ckeck-new-password"
                onChange={() => {}}
              />
            </div>
            <div className="mt-pr-24 flex items-center justify-between gap-pr-8">
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
          </form>
        </div>
      </ModalBase>
    </>
  );
}
