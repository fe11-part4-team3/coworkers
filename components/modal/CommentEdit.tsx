import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';

/**
 * 댓글 수정 모달 컴포넌트.
 * 댓글 수정 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (댓글 수정을 처리하는 함수 전달해주세요.)
 */

export default function CommentEdit({ onClick }: { onClick: () => void }) {
  const { closeModal } = useModalStore();

  /* 꼭 읽어주세요. 
  확인 버튼 클릭 시 key 값과 value (true) 값을 잘 확인하고,
  아래 { key: true } 부분 수정해서 사용해주세요. 
  */

  const handleOnClick = () => {
    onClick();
    closeModal();
  };

  return (
    <>
      <div className="modal-title-wrapper">
        <h2 className="modal-title">댓글을 수정하시겠습니까?</h2>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="secondary"
          textColor="default"
          backgroundColor="white"
        />
        <Buttons
          text="수정"
          onClick={handleOnClick}
          backgroundColor="default"
        />
      </div>
    </>
  );
}
