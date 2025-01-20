import { Card, CardContent, CardFooter } from '../ui/card';
import Profile from '../Profile';
import DateDisplay from '../DateDisplay';
import CommentContent from './CommentContent';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import DropDown from '../DropDown';
import { TaskDetailCommentProps } from '@/types/taskDetailComment.type';
import TextareaField from '../InputField/TextareaField';

function TaskDetailComment({ commentData }: TaskDetailCommentProps) {
  const { id, content, createdAt, user } = commentData;
  const [commentContent, setCommentContent] = useState(content);
  const [commentEdit, setCommentEdit] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (commentEdit && textareaRef.current) {
      textareaRef.current.focus(); // 상태가 true가 되면 포커스 설정
      // 커서를 텍스트 끝으로 이동
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [commentEdit]);

  const handleEditClick = () => {
    setCommentEdit(true);
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  return (
    <Card className="rounded-none border-l-0 border-r-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none">
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
          ref={textareaRef}
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
