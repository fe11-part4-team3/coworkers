import DropDown from '../DropDown';

/**
 * @param {Function} props.handleEditClick - 댓글 수정하기
 * @param {Function} props.handleDeleteClick - 댓글 삭제하기
 * @returns {JSX.Element} - 댓글 DropDown 컴포넌트
 */
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
