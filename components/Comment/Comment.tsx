import { ChangeEvent, useState } from 'react';

import { Card } from '@/components/ui/card';
import { IArticleComment } from '@/types/articleComment.type';
import TextareaField from '@/components/InputField/TextareaField';
import ArticleDetailContent from '@/components/Comment/CommentContent';
import ArticleDetailFooter from '@/components/Comment/CommentFooter';
import { ITaskComment } from '@/types/comment.type';

type handlerType = (id: number) => void;

const ARTICLE_COMMENT_STYLE = 'bg-b-secondary px-pr-24 py-pr-20';
const TASK_COMMENT_STYLE =
  'rounded-none border-x-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none';

/**
 * 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 * @param {object} props - 컴포넌트에 전달되는 props
 * @param {'article' | 'task'} [props.type='article'] - 댓글의 유형 (게시글 댓글 or 할 일 댓글)
 * @param {IArticleComment | ITaskComment} props.commentData - 댓글 데이터
 * @param {Function} props.handleDeleteClick - 댓글을 삭제하는 함수, 댓글 ID를 인수로 받습니다.
 * @param {Function} props.handleUpdateSubmit - 댓글을 업데이트하는 함수, 댓글 ID를 인수로 받습니다.
 * @returns {JSX.Element} 게시글 상세 페이지 댓글 컴포넌트
 *
 * @example
 * 게시글 댓글의 경우
 * {commentData.list.map((comment) => {
    return (
      <ArticleDetailComment
        key={comment.id}
        type="article | task"
        commentData={comment}
        handleDeleteClick={(id) => alert(`${id} 삭제`)}
        handleUpdateSubmit={(id) => alert(`${id} 수정`)}
      />
    );
 * })}
 * 
 * 할 일 상세 댓글의 경우
 * {TaskCommentData.map((comment) => {
    return (
      <ArticleDetailComment
        type="task"
        ...
      />
    );
  })}
 */
function ArticleDetailComment({
  type = 'article',
  commentData,
  handleDeleteClick,
  handleUpdateSubmit,
}: {
  type?: 'article' | 'task';
  commentData: IArticleComment | ITaskComment;
  handleDeleteClick: handlerType;
  handleUpdateSubmit: handlerType;
}) {
  const { id, content, createdAt } = commentData;
  const [commentEditContent, setCommentEditContent] = useState(content);
  const [commentEdit, setCommentEdit] = useState(false);

  const isArticleComment = type === 'article';

  // 타입 단언으로 writer/user 접근
  const writer = isArticleComment
    ? (commentData as IArticleComment).writer
    : undefined;
  const user = type === 'task' ? (commentData as ITaskComment).user : undefined;

  // Dropdown 수정하기
  const handleEditClick = () => {
    setCommentEdit(true);
  };

  // Dropdown 삭제하기
  const commentDelete = () => {
    // handleDeleteClick 함수로 댓글 id를 넘겨받아 DELETE 데이터 요청 실행
    handleDeleteClick(id);
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
  const updateSubmit = () => {
    setCommentEdit(false);

    // handleUpdateSubmit 함수로 댓글 id를 넘겨받아 PATCH 데이터 요청 실행
    handleUpdateSubmit(id);
  };

  return (
    <Card
      className={`${isArticleComment ? ARTICLE_COMMENT_STYLE : TASK_COMMENT_STYLE} `}
    >
      {!commentEdit ? (
        <ArticleDetailContent
          type={type}
          commentEditContent={commentEditContent}
          writer={writer}
          user={user}
          handleEditClick={handleEditClick}
          commentDelete={commentDelete}
        />
      ) : (
        <div className="mb-pr-16">
          <TextareaField
            name="content"
            size="md"
            value={commentEditContent}
            placeholder="댓글을 입력해주세요"
            onChange={updateCommentContent}
          />
        </div>
      )}

      <ArticleDetailFooter
        type={type}
        writer={writer}
        user={user}
        commentEdit={commentEdit}
        createdAt={createdAt}
        commentEditContent={commentEditContent}
        content={content}
        cancelEditing={cancelEditing}
        updateSubmit={updateSubmit}
      />
    </Card>
  );
}

export default ArticleDetailComment;
