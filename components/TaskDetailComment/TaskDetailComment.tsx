import { ChangeEvent, useState } from 'react';

import { TaskDetailCommentProps } from '@/types/taskDetailComment.type';

import { Card, CardContent, CardFooter } from '../ui/card';
import Profile from '../Profile';
import DateDisplay from '../DateDisplay';
import CommentContent from './CommentContent';
import DropDown from '../DropDown';
import TextareaField from '../InputField/TextareaField';

function TaskDetailComment({ commentData }: TaskDetailCommentProps) {
  const { id, content, createdAt, user } = commentData;
  const [commentContent, setCommentContent] = useState(content);
  const [commentEdit, setCommentEdit] = useState(false);

  const handleEditClick = () => {
    setCommentEdit(true);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <Card className="rounded-none border-x-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none">
      {!commentEdit ? (
        <CardContent className="flex justify-between p-0">
          <CommentContent content={commentContent} />
          <DropDown
            trigger={<button>s</button>}
            items={[
              { text: '수정하기', onClick: handleEditClick },
              { text: '삭제하기', onClick: () => alert(`${id} 댓글 삭제`) },
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
          onChange={handleCommentChange}
        />
      )}

      <CardFooter className="mt-pr-16 flex justify-between p-0">
        <Profile user={user} />
        {!commentEdit ? (
          <DateDisplay createdAt={createdAt} />
        ) : (
          <div>
            <button onClick={() => setCommentEdit(false)} className="mr-pr-12">
              취소
            </button>
            <button onSubmit={() => alert('댓글 수정')}>수정하기</button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default TaskDetailComment;
