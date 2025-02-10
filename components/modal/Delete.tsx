import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';

/**
 * 게시글, 댓글 삭제 모달 컴포넌트.
 * 게시글 삭제와 댓글 삭제 기능을 제공합니다.
 *
 * @param {string} title - 모달 타이틀 (게시글 or 댓글)
 * @param {Function} onClick - 모달 실행 함수 (게시글, 댓글 삭제를 처리하는 함수 전달해주세요.)
 */

export default function Delete({
  title,
  onClick,
}: {
  title: '게시글' | '댓글';
  onClick: () => void;
}) {
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
        <h2 className="modal-title">{title}을 삭제하시겠습니까?</h2>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="secondary"
          textColor="default"
          backgroundColor="white"
        />
        <Buttons text="삭제" onClick={handleOnClick} backgroundColor="danger" />
      </div>
    </>
  );
}
