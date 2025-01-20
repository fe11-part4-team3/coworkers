'use client';

import useModalStore from '@/stores/modalStore';
import Button from '@/components/Button';
import ModalBase from '@/components/modal/ModalBase';
import InputField from '@/components/InputField/InputField';

/**
 * 비밀번호 재설정 모달 컴포넌트.
 * 링크 보내기 버튼 클릭 시 비밀번호 재설정 링크를 보내는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (비밀번호 재설정 링크를 보내는 함수 전달해주세요.)
 */

export default function ResetPassword({ onClick }: { onClick: () => void }) {
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
            <h2 className="mb-pr-8 text-18 text-t-primary">비밀번호 재설정</h2>
            <p className="text-14 text-t-secondary">
              비밀번호 재설정 링크를 보내드립니다.
            </p>
          </div>
          <form className="mt-pr-16">
            <InputField
              value=""
              placeholder="이메일을 입력하세요."
              name="reset-password"
              onChange={() => {}}
            />
            <div className="mt-pr-24 flex items-center justify-between gap-pr-8">
              <Button
                text="닫기"
                onClick={closeModal}
                color="primaryReverse"
                className="w-1/2"
              />
              <Button
                text="링크 보내기"
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
