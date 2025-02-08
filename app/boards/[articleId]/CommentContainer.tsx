import { ChangeEvent, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

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
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function CommentContainer({ articleId }: { articleId: number }) {
  const [commentValue, setCommentValue] = useState('');

  const queryClient = useQueryClient();

  // 게시글 댓글 생성
  const createCommentMutation = useMutation({
    mutationFn: (newComment: CreateArticleCommentParams) =>
      createArticleComment(newComment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['commentList'] });
      setCommentValue('');
    },
  });

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setCommentValue(e.target.value);
  };

  const handleCommentSubmit = () => {
    createCommentMutation.mutate({ articleId, content: commentValue });
  };

  // 게시글 댓글 리스트 조회 (무한스크롤)
  const {
    ref,
    data: articleComments,
    isLoading,
    isError,
  } = useIntersectionObserver({
    queryKey: 'commentList',
    api: getArticleCommentList,
    apiParams: { articleId: articleId, limit: 6 },
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });

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

  if (!articleComments) return;
  if (isError) return '에러가 발생했습니다.';

  return (
    <>
      <ArticleCommentTextarea
        commentValue={commentValue}
        handleCommentChange={handleCommentChange}
        handleCommentSubmit={handleCommentSubmit}
      />

      <div className="mb-pr-56 mt-pr-40 flex flex-col gap-pr-16 border border-x-0 border-b-0 pt-pr-40">
        {articleComments?.pages[0].list.length > 0 ? (
          articleComments.pages
            .flatMap((page) => page.list) // 페이지별 댓글 리스트를 하나의 배열로 변환
            .map((comment) => (
              <Comment
                key={comment.id}
                type="article"
                commentData={comment}
                handleDeleteClick={(id) =>
                  handleCommentDelete({ commentId: id })
                }
                handleUpdateSubmit={(id, content) =>
                  handleUpdateSubmit({ commentId: id, content })
                }
                isLoading={isLoading}
              />
            ))
        ) : (
          <p className="my-pr-118 text-center text-16m text-t-default">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
        <div ref={ref} style={{ height: '20px' }} />
      </div>
    </>
  );
}

export default CommentContainer;
