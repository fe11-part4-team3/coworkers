import { useState } from 'react';

import UploadIcon from '@/public/images/icon-upload.svg';

/**
 * 댓글 입력 컴포넌트
 * @param {function} props.postComment - 댓글 등록 함수
 * @returns {JSX.Element} 댓글 입력 컴포넌트
 */

export default function TaskDetailCommentInput({
  postComment,
}: {
  postComment: () => void;
}) {
  const [comment, setComment] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    if (comment.trim().length === 0) alert('댓글을 입력해주세요');
    e.preventDefault();
    postComment();
    setComment('');
  };

  return (
    <>
      <form className="relative">
        <input
          className="w-full border-y border-input bg-b-secondary py-pr-16 text-14 text-t-primary placeholder:text-t-default focus:outline-none"
          placeholder="댓글을 달아주세요"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
        />
        <button
          className="absolute right-0 top-0 flex h-full items-center"
          onClick={handleSubmit}
        >
          <UploadIcon />
        </button>
      </form>
    </>
  );
}
