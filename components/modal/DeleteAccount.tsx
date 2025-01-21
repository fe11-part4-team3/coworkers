'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import ModalBase from '@/components/modal/ModalBase';
import DangerIcon from '@/public/images/icon-danger.svg';

/**
 * 회원 탈퇴 모달 컴포넌트.
 * 회원 탈퇴 버튼 클릭 시 회원 탈퇴 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (회원 탈퇴 기능을 처리하는 함수 전달해주세요.)
 */

export default function DeleteAccount({
  onClick,
}: {
  onClick: (body: object) => void;
}) {
  const { closeModal } = useModalStore();

  /* 꼭 읽어주세요.
     확인 버튼 클릭 시 key 값과 value (true) 값을 잘 확인하고,
     아래 { key: true } 부분 수정해서 사용해주세요. 
  */

  const handleOnClick = () => {
    const body = { key: true };
    onClick(body);
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
              회원 탈퇴를 진행하시겠어요?
            </h2>
            <p className="text-14 text-t-secondary">
              그룹장으로 있는 그룹은 자동으로 삭제되고, <br />
              모든 그룹에서 나가집니다.
            </p>
          </div>
          <div className="flex items-center justify-between gap-pr-8">
            <Buttons
              text="닫기"
              size="XL"
              onClick={closeModal}
              variant="secondary"
              bg="white"
            />
            <Buttons
              text="회원 탈퇴"
              size="XL"
              onClick={handleOnClick}
              variant="destructive"
            />
          </div>
        </div>
      </ModalBase>
    </>
  );
}
