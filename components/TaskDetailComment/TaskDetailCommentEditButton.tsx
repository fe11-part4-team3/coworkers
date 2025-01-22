import Buttons from '../Buttons';

/**
 * @param {boolean} props.disabled - 기존 댓글 내용, 수정 입력 내용 비교
 * @param {Function} props.cancelEditing - 댓글 수정모드 취소 버튼
 * @param {Function} props.saveChanges - 댓글 수정모드 수정 완료 버튼
 * @returns {JSX.Element} - 댓글 수정모드 버튼 컴포넌트
 */
function TaskDetailCommentEditButton({
  disabled,
  cancelEditing,
  saveChanges,
}: {
  disabled: boolean;
  cancelEditing: () => void;
  saveChanges: () => void;
}) {
  return (
    <div className="flex gap-pr-8">
      <button
        className="w-pr-48 text-14sb text-t-default"
        onClick={cancelEditing}
      >
        취소
      </button>

      <Buttons
        disabled={disabled}
        text="수정하기"
        variant="outline"
        onClick={saveChanges}
        bg="none"
        size="S"
        width="w-pr-74"
      />
    </div>
  );
}

export default TaskDetailCommentEditButton;
