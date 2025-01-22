import DropDown from '../DropDown';

function TaskDetailCommentDropDown({
  handleEditClick,
  handleDeleteClick,
}: {
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}) {
  return (
    <DropDown
      trigger={<button className="icon-kebab" />}
      items={[
        { text: '수정하기', onClick: handleEditClick },
        { text: '삭제하기', onClick: handleDeleteClick },
      ]}
      width="w-pr-120"
    />
  );
}

export default TaskDetailCommentDropDown;
