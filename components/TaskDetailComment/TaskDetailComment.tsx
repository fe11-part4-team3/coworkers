import { ChangeEvent, useState } from 'react';

import { TaskDetailCommentProps } from '@/types/taskDetailComment.type';

import { Card, CardContent, CardFooter } from '../ui/card';
import Profile from '../Profile';
import DateDisplay from '../DateDisplay';
import CommentContent from './CommentContent';
import DropDown from '../DropDown';
import TextareaField from '../InputField/TextareaField';

/**
 * @param {object} props.commentData - 댓글 데이터
 * @returns {JSX.Element} 댓글 컴포넌트
 */
function TaskDetailComment({ commentData }: TaskDetailCommentProps) {
  const { id, content, createdAt, user } = commentData;
  const [commentContent, setCommentContent] = useState(content);
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
    setCommentContent(e.target.value);
  };

  // 수정 중 취소하기 버튼
  const cancelEditing = () => {
    setCommentEdit(false);
    setCommentContent(content);
  };

  // 수정 완료
  const saveChanges = () => {
    setCommentEdit(false);
    // 댓글 수정 데이터 요청 로직 필요
  };

  return (
    <Card className="rounded-none border-x-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none">
      {!commentEdit ? (
        <CardContent className="flex justify-between p-0">
          <CommentContent content={commentContent} />
          <DropDown
            trigger={<button className="icon-kebab" />}
            items={[
              { text: '수정하기', onClick: handleEditClick },
              { text: '삭제하기', onClick: handleDeleteClick },
            ]}
            width="w-pr-100"
          />
        </CardContent>
      ) : (
        <TextareaField
          name="content"
          size="md"
          value={commentContent}
          placeholder="댓글을 입력해주세요"
          onChange={updateCommentContent}
        />
      )}

      <CardFooter className="mt-pr-16 flex justify-between p-0">
        <Profile user={user} />
        {!commentEdit ? (
          <DateDisplay createdAt={createdAt} />
        ) : (
          <>
            <button onClick={cancelEditing} className="mr-pr-12">
              취소
            </button>
            <button onClick={saveChanges}>수정하기</button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default TaskDetailComment;
