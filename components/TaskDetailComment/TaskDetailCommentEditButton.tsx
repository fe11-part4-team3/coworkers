import Buttons from '../Buttons';

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
