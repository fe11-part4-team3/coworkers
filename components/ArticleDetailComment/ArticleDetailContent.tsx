import { CardContent } from '@/components/ui/card';
import useUserStore from '@/stores/useUser.store';
import KebabDropDown from '@/components/KebabDropDown';

/**
 * @param {string} props.commentEditContent - 댓글 내용
 * @param {object} props.writer - 댓글 작성자 유저 id (작성자 본인인지 판별)
 * @param {Function} props.handleEditClick - 댓글 수정 함수
 * @param {Function} props.handleDeleteClick - 댓글 삭제 함수
 * @returns {JSX.Element} 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 */
function ArticleDetailContent({
  commentEditContent,
  writer,
  handleEditClick,
  handleDeleteClick,
}: {
  commentEditContent: string;
  writer: {
    id: number;
  };
  handleEditClick: () => void;
  handleDeleteClick: () => void;
}) {
  const { user: userData } = useUserStore();

  return (
    <CardContent className="flex justify-between p-0">
      <p className="break-all text-16 text-t-primary">{commentEditContent}</p>

      {userData?.id === writer.id && (
        <div className="ml-pr-16 leading-[0]">
          <KebabDropDown
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      )}
    </CardContent>
  );
}

export default ArticleDetailContent;
