import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';

import { Card } from '@/components/ui/card';
import { IArticleComment } from '@/types/articleComment.type';
import TextareaField from '@/components/InputField/TextareaField';
import CommentContent from '@/components/Comment/CommentContent';
import CommentFooter from '@/components/Comment/CommentFooter';
import { CommentProps, ITaskComment } from '@/types/comment.type';
import useModalStore from '@/stores/modalStore';

import EditDelete from '../modal/EditDelete';

const ARTICLE_COMMENT_STYLE = 'bg-b-secondary px-pr-24 py-pr-20 border-none';
const TASK_COMMENT_STYLE =
  'rounded-none border-x-0 border-t-0 border-input bg-transparent py-pr-16 shadow-none';

/**
 * 게시글 상세 페이지 댓글(조회, 수정) 컴포넌트
 * @param {'article' | 'task'} [props.type='article'] - 댓글의 유형 (게시글 댓글 or 할 일 댓글)
 * @param {IArticleComment | ITaskComment} props.commentData - 댓글 데이터
 * @param {Function} props.handleDeleteClick - 댓글을 삭제하는 함수, 댓글 ID를 인수로 받습니다.
 * @param {Function} props.handleUpdateSubmit - 댓글을 업데이트하는 함수, 댓글 ID를 인수로 받습니다.
 * @param {boolean} props.isLoading - 댓글 리스트 데이터 로딩 유무
 * @returns {JSX.Element} 게시글 상세 페이지 댓글 컴포넌트
 */
function Comment({
  taskId,
  type = 'article',
  commentData,
  handleDeleteClick,
  handleUpdateSubmit,
  isLoading = false,
}: CommentProps) {
  const { id, content, createdAt, updatedAt } = commentData;
  const [commentEditContent, setCommentEditContent] = useState(content);
  const [commentEdit, setCommentEdit] = useState(false);

  const { openModal } = useModalStore();

  const isArticleComment = type === 'article';
  const isTaskComment = type === 'task';

  // 타입 단언으로 writer/user 접근
  const writer = isArticleComment
    ? (commentData as IArticleComment).writer
    : undefined;
  const user = isTaskComment ? (commentData as ITaskComment).user : undefined;

  // 수정 완료
  const updateSubmit = () => {
    setCommentEdit(false);

    if (taskId)
      return handleUpdateSubmit({
        taskId,
        commentId: id,
        content: commentEditContent,
      });
    else
      return openModal(
        <EditDelete
          title="댓글"
          actionType="수정"
          onClick={() => {
            handleUpdateSubmit(id, commentEditContent);
            setCommentEdit(false);
          }}
        />,
      );
  };

  return (
    <Card
      className={classNames(
        isArticleComment ? ARTICLE_COMMENT_STYLE : TASK_COMMENT_STYLE,
      )}
    >
      {!commentEdit ? (
        <CommentContent
          type={type}
          commentEditContent={commentEditContent}
          writer={writer}
          user={user}
          handleEditClick={() => setCommentEdit(true)}
          commentDelete={() => handleDeleteClick(id)}
          isLoading={isLoading}
        />
      ) : (
        <div className="mb-pr-16">
          <TextareaField
            name="content"
            size="md"
            value={commentEditContent}
            placeholder="댓글을 입력해주세요"
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setCommentEditContent(e.target.value)
            }
          />
        </div>
      )}

      <CommentFooter
        type={type}
        writer={writer}
        user={user}
        commentEdit={commentEdit}
        createdAt={createdAt}
        updatedAt={updatedAt}
        commentEditContent={commentEditContent}
        content={content}
        cancelEditing={() => {
          setCommentEdit(false);
          setCommentEditContent(content);
        }}
        updateSubmit={updateSubmit}
        isLoading={isLoading}
      />
    </Card>
  );
}

export default Comment;
