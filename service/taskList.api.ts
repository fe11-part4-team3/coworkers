import {
  CreateTaskListParams,
  CreateTaskListResponse,
  DeleteTaskListParams,
  GetTaskListParams,
  ITaskList,
  OrderTaskListParams,
  UpdateTaskListParams,
  UpdateTaskListResponse,
} from '@/types/taskList.type';

import instance from './axios';

const getTaskList = async ({
  groupId,
  id,
  date,
}: GetTaskListParams): Promise<ITaskList> => {
  const path = `/groups/${groupId}/task-lists/${id}`;
  const response = await instance.get(path, {
    params: { date },
  });
  return response.data;
};

const updateTaskList = async ({
  groupId,
  id,
  name,
}: UpdateTaskListParams): Promise<UpdateTaskListResponse> => {
  const path = `/groups/${groupId}/task-lists/${id}`;
  const response = await instance.patch(path, { name });
  return response.data;
};

const deleteTaskList = async ({
  groupId,
  id,
}: DeleteTaskListParams): Promise<boolean> => {
  const path = `/groups/${groupId}/task-lists/${id}`;
  const response = await instance.delete(path);
  return response.status === 204;
};

const createTaskList = async ({
  groupId,
  name,
}: CreateTaskListParams): Promise<CreateTaskListResponse> => {
  const path = `/groups/${groupId}/task-lists`;
  const response = await instance.post(path, {
    name,
  });
  return response.data;
};

/**
 * 할일 목록의 순서를 변경합니다.
 * - taskList의 displayIndex를 변경합니다.
 * - 해당 taskList가 기존 displayIndex를 버리고 넘어가면서,
 * - 그 빈 displayIndex는 "한 자리씩 당겨지는 식"으로 변경됩니다.
 * - [1,2,3,4] => (3을 0 인덱스로) => [3,1,2,4] => (4를 1 인덱스로) => [3,4,1,2]
 */
const orderTaskList = async ({
  groupId,
  id,
  displayIndex,
}: OrderTaskListParams): Promise<boolean> => {
  const path = `/groups/${groupId}/task-lists/${id}`;
  const response = await instance.patch(path, {
    displayIndex,
  });
  return response.status === 204;
};

export {
  getTaskList,
  updateTaskList,
  deleteTaskList,
  createTaskList,
  orderTaskList,
};
