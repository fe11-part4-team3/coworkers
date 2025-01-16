import {
  CreateArticleCommentParams,
  DeleteArticleCommentParams,
  GetArticleCommentListParams,
  IArticleComment,
  IArticleCommentList,
  UpdateArticleCommentParams,
} from '@/types/articleComment.type';

import instance from './axios';

const createArticleComment = async ({
  articleId,
  content,
}: CreateArticleCommentParams): Promise<IArticleComment> => {
  const path = `/articles/${articleId}/comments`;
  const response = await instance.post(path, { content });
  return response.data;
};

const getArticleCommentList = async ({
  articleId,
  limit,
  cursor,
}: GetArticleCommentListParams): Promise<IArticleCommentList> => {
  const path = `/articles/${articleId}/comments`;
  const response = await instance.get(path, {
    params: {
      limit,
      cursor,
    },
  });
  return response.data;
};

const updateArticleComment = async ({
  commentId,
  content,
}: UpdateArticleCommentParams): Promise<IArticleComment> => {
  const path = `/comment/${commentId}`;
  const response = await instance.patch(path, {
    content,
  });
  return response.data;
};

/**
 * @returns 삭제된 Article Comment ID (추측)
 */
const deleteArticleComment = async ({
  commentId,
}: DeleteArticleCommentParams): Promise<number> => {
  const path = `/comment/${commentId}`;
  const response = await instance.delete(path);
  return response.data.id;
};

export {
  createArticleComment,
  getArticleCommentList,
  updateArticleComment,
  deleteArticleComment,
};
