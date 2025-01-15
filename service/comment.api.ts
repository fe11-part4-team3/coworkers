import {
  CreateCommentParams,
  DeleteCommentParams,
  GetCommentParams,
  UpdateCommentParams,
} from '@/types/comment.type';
import { IUserProfile } from '@/types/user.type';

import instance from './axios';

const getComment = async ({
  taskId,
}: GetCommentParams): Promise<string> => {
  const response = await instance.get(
    `/tasks/${taskId}/comments`,
  );
  return response.data;
};

const createComment = async ({
  taskId,
  content,
}: CreateCommentParams): Promise<IUserProfile> => {
  const path = `/tasks/${taskId}/comments`;
  const response = await instance.post(path, { content });
  return response.data;
};

const updateComment = async ({
  taskId,
  commentId,
  content,
}: UpdateCommentParams): Promise<string> => {
  const path = `/tasks/${taskId}/comments/${commentId}`;
  const response = await instance.patch(path, { content });
  return response.data;
};

const deleteComment = async ({
  taskId,
  commentId,
}: DeleteCommentParams): Promise<string> => {
  const path = `/tasks/${taskId}/comments/${commentId}`;
  const response = await instance.delete(path);
  return response.data;
};

export {
  getComment,
  createComment,
  updateComment,
  deleteComment,
};
