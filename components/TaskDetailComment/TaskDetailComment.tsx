import { ChangeEvent, useState } from 'react';

import useUserStore from '@/stores/useUser.store';
import { ITaskComment } from '@/types/comment.type';

import { Card, CardContent, CardFooter } from '../ui/card';
import DateDisplay from '../DateDisplay';
import CommentContent from './TaskDeTailCommentContent';
import TextareaField from '../InputField/TextareaField';
import TaskDetailCommentDropDown from './TaskDetailCommentDropDown';
import TaskDetailCommentProfile from './TaskDetailCommentProfile';
import TaskDetailCommentEditButton from './TaskDetailCommentEditButton';

/**
 * @param {object} props.commentData - 댓글 데이터
 * @returns {JSX.Element} 할 일 상세 댓글 컴포넌트
 */
function TaskDetailComment({ commentData }: { commentData: ITaskComment }) {
  const { id, content, createdAt, user } = commentData;

  const { user: userData } = useUserStore();

  // 댓글 수정 내용 (기존 댓글과 비교하여 변경 사항이 없다면 수정 버튼 disabled 처리)
  const [commentEditContent, setCommentEditContent] = useState(content);
  // 수정 활성화
  const [commentEdit, setCommentEdit] = useState(false);

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
        <CardContent className="flex min-h-pr-16 justify-between p-0">
          <CommentContent content={commentEditContent} />

          {/* 작성자만 DropDown(수정, 삭제) 노출 */}
          {userData?.id === user.id && (
            <TaskDetailCommentDropDown
              handleEditClick={handleEditClick}
              handleDeleteClick={handleDeleteClick}
            />
          )}
        </CardContent>
      ) : (
        <TextareaField
          name="content"
          size="md"
          value={commentEditContent}
          placeholder="댓글을 입력해주세요"
          onChange={updateCommentContent}
        />
      )}

      <CardFooter className="mt-pr-16 flex justify-between p-0">
        <TaskDetailCommentProfile user={user} />

        {!commentEdit ? (
          <DateDisplay createdAt={createdAt} />
        ) : (
          <TaskDetailCommentEditButton
            disabled={commentEditContent === content}
            cancelEditing={cancelEditing}
            saveChanges={saveChanges}
          />
        )}
      </CardFooter>
    </Card>
  );
}

export default TaskDetailComment;
