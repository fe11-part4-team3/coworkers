import { ChangeEvent } from 'react';

import TextareaField from '@/components/InputField/TextareaField';
import Buttons from '@/components/Buttons';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

interface ArticleCommentTextareaProps {
  commentValue: string;
  handleCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleCommentSubmit: () => void;
}

/**
 * @param {string} props.commentValue - textarea 입력 값
 * @param {Function} props.handleCommentChange - textarea 입력 값 변경 이벤트
 * @param {Function} props.handleCommentSubmit - textarea 입력 값 등록
 * @returns {JSX.Element} - 자유게시판 게시글 상세 댓글 입력 컴포넌트
 */
function ArticleCommentTextarea({
  commentValue = '',
  handleCommentChange,
  handleCommentSubmit,
}: ArticleCommentTextareaProps) {
  const deviceType = useDeviceType();
  const mobile = deviceType === 'mobile';

  return (
    <>
      <TextareaField
        name="content"
        value={commentValue}
        size="lg"
        label="댓글달기"
        placeholder="댓글을 입력해주세요."
        onChange={handleCommentChange}
      />

      <div className="mt-pr-16 flex justify-end">
        <Buttons
          text="등록"
          disabled={commentValue === ''}
          onClick={handleCommentSubmit}
          size={!mobile ? 'XL' : 'S'}
          width="w-pr-184 mo:w-pr-74"
        />
      </div>
    </>
  );
}

export default ArticleCommentTextarea;
