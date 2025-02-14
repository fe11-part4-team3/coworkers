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
  cursor?: number | null;
}

interface UpdateArticleCommentParams {
  commentId: number;
  content: string;
}

interface DeleteArticleCommentParams {
  commentId: number;
}

interface CommentProps {
  type?: 'article' | 'task';
  commentEditContent: string;
  isLoading: boolean;
}

interface IUser {
  id: number;
}

interface CommentContentProps extends CommentProps {
  writer?: IUser;
  user?: IUser;
  handleEditClick: () => void;
  commentDelete: () => void;
}

interface CommentFooterProps extends CommentProps {
  writer?: IUserProfile;
  user?: IUserProfile;
  commentEdit: boolean;
  createdAt: string;
  updatedAt: string;
  content: string;
  cancelEditing: () => void;
  updateSubmit: () => void;
}

export type {
  IArticleComment,
  IArticleCommentList,
  CreateArticleCommentParams,
  GetArticleCommentListParams,
  UpdateArticleCommentParams,
  DeleteArticleCommentParams,
  CommentContentProps,
  CommentFooterProps,
};
