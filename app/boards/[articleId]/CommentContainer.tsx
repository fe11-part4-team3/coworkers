import { ChangeEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ArticleCommentTextarea from '@/components/ArticleCommentTextarea/ArticleCommentTextarea';
import Comment from '@/components/Comment/Comment';
import {
  createArticleComment,
  deleteArticleComment,
  getArticleCommentList,
  updateArticleComment,
} from '@/service/articleComment.api';
import {
  CreateArticleCommentParams,
  DeleteArticleCommentParams,
  UpdateArticleCommentParams,
} from '@/types/articleComment.type';

function CommentContainer({ articleId }: { articleId: number }) {
  const [commentValue, setCommentValue] = useState('');

  const queryClient = useQueryClient();

  // 게시글 댓글 리스트 조회
  const { data: articleComments } = useQuery({
    queryKey: ['commentList'],
    queryFn: () => getArticleCommentList({ articleId, limit: 100 }),
  });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  // 게시글 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: (newComment: CreateArticleCommentParams) =>
      createArticleComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
      setCommentValue('');
    },
  });

  const handleCommentSubmit = () => {
    createCommentMutation.mutate({ articleId, content: commentValue });
  };

  // 게시글 댓글 삭제
  const deleteCommentMutation = useMutation({
    mutationFn: (deleteComment: DeleteArticleCommentParams) =>
      deleteArticleComment(deleteComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
  });

  const handleCommentDelete = ({ commentId }: DeleteArticleCommentParams) => {
    if (confirm('댓글을 삭제하시겠습니까?')) {
      deleteCommentMutation.mutate({ commentId });
    }
  };

  // 게시글 댓글 수정
  const updateCommentMutation = useMutation({
    mutationFn: (updateComment: UpdateArticleCommentParams) =>
      updateArticleComment(updateComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
    },
  });

  const handleUpdateSubmit = ({
    commentId,
    content,
  }: UpdateArticleCommentParams) => {
    if (confirm('댓글을 수정하시겠습니까?')) {
      updateCommentMutation.mutate({ commentId, content });
    }
  };

  if (!articleComments) return null;

  return (
    <>
      <ArticleCommentTextarea
        commentValue={commentValue}
        handleCommentChange={handleCommentChange}
        handleCommentSubmit={handleCommentSubmit}
      />

      <div className="mb-pr-56 mt-pr-40 flex flex-col gap-pr-16 border border-x-0 border-b-0 pt-pr-40">
        {articleComments.list.length > 0 ? (
          articleComments.list.map((comment) => (
            <Comment
              key={comment.id}
              type="article"
              commentData={comment}
              handleDeleteClick={(id) => handleCommentDelete({ commentId: id })}
              handleUpdateSubmit={(id, content) =>
                handleUpdateSubmit({ commentId: id, content })
              }
            />
          ))
        ) : (
          <p className="mt-pr-118 text-center text-16m text-t-default">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </div>
    </>
  );
}

export default CommentContainer;
