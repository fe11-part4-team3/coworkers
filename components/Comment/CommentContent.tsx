import { useMemo, useState } from 'react';
import classNames from 'classnames';

import { CardContent } from '@/components/ui/card';
import useUserStore from '@/stores/useUser.store';
import KebabDropDown from '@/components/KebabDropDown';
import { Skeleton } from '@/components/ui/skeleton';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import { CommentContentProps } from '@/types/articleComment.type';

/**
 * @param {'article'|'task'} props.type - 컴포넌트 타입(할 일 상세의 댓글 or 게시글 상세의 댓글)
 * @param {string} props.commentEditContent - 댓글 내용
 * @param {object} props.writer - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {object} props.user - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {Function} props.handleEditClick - 댓글 수정 함수
 * @param {Function} props.commentDelete - 댓글 삭제 함수
 * @param {boolean} props.isLoading - 댓글 리스트 데이터 로딩 유무
 * @returns {JSX.Element} 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 */
function CommentContent({
  type = 'article',
  commentEditContent,
  writer,
  user,
  handleEditClick,
  commentDelete,
  isLoading,
}: CommentContentProps) {
  const { user: userData } = useUserStore();
  const isArticleComment = type === 'article';
  const isWriter = userData?.id === (writer?.id ?? user?.id);
  const deviceType = useDeviceType();

  const [isCommentTextMore, setCommentTextMore] = useState(false);

  let textLimit = 155;

  if (deviceType === 'tablet') {
    textLimit = 88;
  } else if (deviceType === 'mobile') {
    textLimit = 33;
  }

  const commenter: string = useMemo(() => {
    if (commentEditContent.length <= textLimit) {
      return commentEditContent;
    }
    return isCommentTextMore
      ? commentEditContent
      : commentEditContent.slice(0, textLimit);
  }, [isCommentTextMore, commentEditContent, textLimit]);

  return (
    <CardContent
      className={classNames(
        isArticleComment ? 'mb-pr-32' : 'mb-pr-16 min-h-pr-16',
        'flex justify-between p-0',
      )}
    >
      {!isLoading ? (
        <p
          className={classNames(
            isArticleComment ? 'text-16' : 'text-14',
            'break-all text-t-primary',
          )}
        >
          {commenter}
          <button
            onClick={() => setCommentTextMore(!isCommentTextMore)}
            className="inline-block text-14 text-t-disabled"
          >
            {commentEditContent.length > textLimit &&
              !isCommentTextMore &&
              '...더보기'}
          </button>
        </p>
      ) : (
        <Skeleton className="h-pr-20 w-pr-150" />
      )}

      {isWriter && (
        <div className="ml-pr-16">
          <KebabDropDown onEdit={handleEditClick} onDelete={commentDelete} />
        </div>
      )}
    </CardContent>
  );
}

export default CommentContent;
