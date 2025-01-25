'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import DangerIcon from '@/public/images/icon-danger.svg';

/**
 * 할 일 삭제 모달 컴포넌트.
 * 삭제하기 버튼 클릭 시 할 일 삭제 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (할 일 삭제 기능을 처리하는 함수 전달해주세요.)
 * @param {string} title - 삭제할 할 일의 제목
 */

export default function DeleteTask({
  onClick: fetchData,
  title,
}: {
  onClick: (bodyData: object) => void;
  title: string;
}) {
  const { closeModal } = useModalStore();

  /* 꼭 읽어주세요.
     확인 버튼 클릭 시 key 값과 value (true) 값을 잘 확인하고,
     아래 { key: true } 부분 수정해서 사용해주세요. 
  */

  const handleOnClick = () => {
    const body = { key: true };
    fetchData(body);
    closeModal();
  };

  return (
    <>
      <DangerIcon width={24} height={24} className="mx-auto mb-pr-16" />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">
          &apos;{title}&apos; <br />할 일을 정말 삭제하시겠어요?
        </h2>
        <p className="modal-subTitle">삭제 후에는 되돌릴 수 없습니다.</p>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          size="XL"
          onClick={closeModal}
          variant="secondary"
          bg="white"
        />
        <Buttons
          text="삭제하기"
          size="XL"
          onClick={handleOnClick}
          variant="destructive"
        />
      </div>
    </>
  );
}
