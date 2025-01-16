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

export type {
  ITaskComment,
  GetTaskCommentParams,
  CreateTaskCommentParams,
  UpdateTaskCommentParams,
  DeleteTaskCommentParams,
};
