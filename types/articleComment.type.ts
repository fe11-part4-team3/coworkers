import { IUserProfile } from './user.type';

interface IArticleComment {
  writer: IUserProfile;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

interface IArticleCommentList {
  nextCursor: number | null;
  list: IArticleComment[];
}

interface CreateArticleCommentParams {
  articleId: number;
  content: string;
}

interface GetArticleCommentListParams {
  articleId: number;
  limit: number;
  cursor?: number;
}

interface UpdateArticleCommentParams {
  commentId: number;
  content: string;
}

interface DeleteArticleCommentParams {
  commentId: number;
}

export type {
  IArticleComment,
  IArticleCommentList,
  CreateArticleCommentParams,
  GetArticleCommentListParams,
  UpdateArticleCommentParams,
  DeleteArticleCommentParams,
};
