import { CardContent } from '@/components/ui/card';
import useUserStore from '@/stores/useUser.store';
import KebabDropDown from '@/components/KebabDropDown';

/**
 * @param {'article'|'task'} props.type - 컴포넌트 타입(할 일 상세의 댓글 or 게시글 상세의 댓글)
 * @param {string} props.commentEditContent - 댓글 내용
 * @param {object} props.writer - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {object} props.user - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {Function} props.handleEditClick - 댓글 수정 함수
 * @param {Function} props.commentDelete - 댓글 삭제 함수
 * @returns {JSX.Element} 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 */
function ArticleDetailContent({
  type = 'article',
  commentEditContent,
  writer,
  user,
  handleEditClick,
  commentDelete,
}: {
  type?: 'article' | 'task';
  commentEditContent: string;
  writer?: {
    id: number;
  };
  user?: {
    id: number;
  };
  handleEditClick: () => void;
  commentDelete: () => void;
}) {
  const { user: userData } = useUserStore();
  const isArticleComment = type === 'article';

  return (
    <CardContent
      className={`${isArticleComment ? 'mb-pr-32' : 'mb-pr-16 min-h-pr-16'} flex justify-between p-0`}
    >
      <p
        className={`${isArticleComment ? 'text-16' : 'text-14'} break-all text-t-primary`}
      >
        {commentEditContent}
      </p>

      {userData?.id === (writer?.id ?? user?.id) && (
        <div className="ml-pr-16">
          <KebabDropDown onEdit={handleEditClick} onDelete={commentDelete} />
        </div>
      )}
    </CardContent>
  );
}

export default ArticleDetailContent;
