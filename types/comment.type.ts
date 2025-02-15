import { IArticleComment } from './articleComment.type';
import { IUserProfile } from './user.type';

interface ITaskComment {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: IUserProfile;
}

interface GetTaskCommentParams {
  taskId: number;
}

interface CreateTaskCommentParams {
  taskId: number;
  content: string;
}

interface UpdateTaskCommentParams {
  taskId: number;
  commentId: number;
  content: string;
}

interface DeleteTaskCommentParams {
  taskId: number;
  commentId: number;
}

interface CommentProps {
  taskId?: number;
  type?: 'article' | 'task';
  commentData: IArticleComment | ITaskComment;
  handleDeleteClick: any;
  handleUpdateSubmit: any;
  isLoading?: boolean;
}

export type {
  ITaskComment,
  GetTaskCommentParams,
  CreateTaskCommentParams,
  UpdateTaskCommentParams,
  DeleteTaskCommentParams,
  CommentProps,
};
