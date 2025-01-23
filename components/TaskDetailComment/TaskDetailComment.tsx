import { ChangeEvent, useState } from 'react';

import { ITaskComment } from '@/types/comment.type';
import useUser from '@/hooks/useUser';

import { Card } from '../ui/card';
import TextareaField from '../InputField/TextareaField';
import TaskDetailContent from './TaskDetailContent';
import TaskDetailFooter from './TaskDetailFooter';

/**
 * @param {object} props.commentData - 댓글 데이터
 * @returns {JSX.Element} 할 일 상세 댓글 컴포넌트
 */
function TaskDetailComment({ commentData }: { commentData: ITaskComment }) {
  const { id, content, createdAt, user } = commentData;

  // 댓글 수정 내용 (기존 댓글과 비교하여 변경 사항이 없다면 수정 버튼 disabled 처리)
  const [commentEditContent, setCommentEditContent] = useState(content);
  // 수정 활성화
  const [commentEdit, setCommentEdit] = useState(false);
  const { user: userData } = useUser();

  // Dropdown 수정하기
  const handleEditClick = () => {
    setCommentEdit(true);
  };

  // Dropdown 삭제하기
  const handleDeleteClick = () => {
    alert(`${id} 댓글 삭제`);
    // 댓글 삭제 데이터 요청 로직 필요
  };

  // textarea value onChange
  const updateCommentContent = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentEditContent(e.target.value);
  };

  // 수정 중 취소하기 버튼
  const cancelEditing = () => {
    setCommentEdit(false);
    setCommentEditContent(content);
  };

  // 수정 완료
  const saveChanges = () => {
    setCommentEdit(false);
    // 댓글 수정 데이터 요청 로직 필요
  };

  return (
    <Card className="rounded-none border-x-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none">
      {!commentEdit ? (
        <TaskDetailContent
          commentEditContent={commentEditContent}
          user={user}
          handleEditClick={handleEditClick}
          handleDeleteClick={handleDeleteClick}
        />
      ) : (
        <TextareaField
          name="content"
          size="md"
          value={commentEditContent}
          placeholder="댓글을 입력해주세요"
          onChange={updateCommentContent}
        />
      )}

      <TaskDetailFooter
        user={user}
        commentEdit={commentEdit}
        createdAt={createdAt}
        commentEditContent={commentEditContent}
        content={content}
        cancelEditing={cancelEditing}
        saveChanges={saveChanges}
      />
    </Card>
  );
}

export default TaskDetailComment;
