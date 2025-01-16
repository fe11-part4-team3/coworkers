import {
  CreateTaskCommentParams,
  DeleteTaskCommentParams,
  GetTaskCommentParams,
  ITaskComment,
  UpdateTaskCommentParams,
} from '@/types/comment.type';

import instance from './axios';

const getTaskComment = async ({
  taskId,
}: GetTaskCommentParams): Promise<string> => {
  const response = await instance.get(
    `/tasks/${taskId}/comments`,
  );
  return response.data;
};

const createTaskComment = async ({
  taskId,
  content,
}: CreateTaskCommentParams): Promise<ITaskComment> => {
  const path = `/tasks/${taskId}/comments`;
  const response = await instance.post(path, { content });
  return response.data;
};

const updateTaskComment = async ({
  taskId,
  commentId,
  content,
}: UpdateTaskCommentParams): Promise<string> => {
  const path = `/tasks/${taskId}/comments/${commentId}`;
  const response = await instance.patch(path, { content });
  return response.data;
};

const deleteTaskComment = async ({
  taskId,
  commentId,
}: DeleteTaskCommentParams): Promise<string> => {
  const path = `/tasks/${taskId}/comments/${commentId}`;
  const response = await instance.delete(path);
  return response.data;
};

export {
  getTaskComment,
  createTaskComment,
  updateTaskComment,
  deleteTaskComment,
};
