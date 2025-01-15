import { IUserProfile } from './user.type';

interface IComment {
  content: string;
  updatedAt: string;
  createdAt: string;
  id: number;
  user: IUserProfile;
}

interface GetCommentParams {
  taskId: number;
}

interface CreateCommentParams {
  taskId: number;
  content: string;
}

interface UpdateCommentParams {
  taskId: number;
  commentId: number;
  content: string;
}

interface DeleteCommentParams {
  taskId: number;
  commentId: number;
}

export type {
  IComment,
  GetCommentParams,
  CreateCommentParams,
  UpdateCommentParams,
  DeleteCommentParams,
};
