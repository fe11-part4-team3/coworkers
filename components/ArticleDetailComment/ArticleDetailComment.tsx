import { ChangeEvent, useState } from 'react';

import { Card } from '@/components/ui/card';
import { IArticleComment } from '@/types/articleComment.type';
import TextareaField from '@/components/InputField/TextareaField';
import ArticleDetailContent from '@/components/ArticleDetailComment/ArticleDetailContent';
import ArticleDetailFooter from '@/components/ArticleDetailComment/ArticleDetailFooter';

/**
 * @param {object} props.commentData - 댓글 데이터
 * @returns {JSX.Element} 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 */
function ArticleDetailComment({
  commentData,
}: {
  commentData: IArticleComment;
}) {
  const { id, content, createdAt, writer } = commentData;
  const [commentEditContent, setCommentEditContent] = useState(content);
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
    <Card className="bg-b-secondary px-pr-24 py-pr-20">
      {!commentEdit ? (
        <ArticleDetailContent
          commentEditContent={commentEditContent}
          writer={writer}
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

      <ArticleDetailFooter
        writer={writer}
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

export default ArticleDetailComment;
