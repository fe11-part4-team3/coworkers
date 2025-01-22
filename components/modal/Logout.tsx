'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import ModalBase from '@/components/modal/ModalBase';

/**
 * 로그아웃 모달 컴포넌트.
 * 로그아웃 버튼 클릭 시 로그아웃 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (로그아웃 기능을 처리하는 함수 전달해주세요.)
 */

export default function Logout({
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
      <ModalBase className="px-pr-52 pt-pr-48">
        <div className="w-full">
          <div className="mb-pr-24 text-center">
            <h2 className="text-18 text-t-primary">로그아웃 하시겠어요?</h2>
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
              text="로그아웃"
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
