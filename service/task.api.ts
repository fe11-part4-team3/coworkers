import {
  CreateTaskParams,
  GetTasksParams,
  ITask,
  GetTaskParams,
  UpdateTaskParams,
  ITaskMetadata,
  DeleteTaskParams,
  OrderTaskParams,
  DeleteRecurringParams,
} from '@/types/task.type';
import { IRecurring } from '@/types/recurring.type';

import instance from './axios';

/**
 * DEPRECATED: 여전히 동작합니다.   
 * 새로운 반복일정 생성 API를 제공합니다.   
 * 아래 /{teamId}/groups/{groupId}/task-lists/{taskListId}/recurring 를 참고하세요
 * 
 * (반복)일정을 생성합니다.    
 * 일종의 정책으로, 반복정책을 정하면,   
 * 해당 정책에 따라 할일이 생성됩니다.    

 * 할일(task)는 반복일정에 지정한 frequencyType에 따라 다르게 생성됩니다.
 * - ONCE: 한 번만 생성 (해당 일 조회시, 할일 존재)
 * - DAILY: 매일 생성 (시작일(startDate) 이후 어느 날짜를 조회해도 존재함)
 * - WEEKLY: 매주 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 * - MONTHLY: 매월 생성 (시작일(startDate) 이후 해당 조건에 따라 존재)
 */
const createTask = async ({
  groupId,
  taskListId,
  body,
}: CreateTaskParams): Promise<IRecurring> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks`;
  const response = await instance.post(path, body);
  return response.data.recurring;
};

const getTasks = async ({
  groupId,
  taskListId,
  date,
}: GetTasksParams): Promise<ITask[]> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks`;
  const response = await instance.get(path, {
    params: { date },
  });
  return response.data;
};

const getTask = async ({
  groupId,
  taskListId,
  taskId,
}: GetTaskParams): Promise<ITask> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`;
  const response = await instance.get(path);
  return response.data;
};

const updateTask = async ({
  groupId,
  taskListId,
  taskId,
  body,
}: UpdateTaskParams): Promise<ITaskMetadata> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`;
  const response = await instance.patch(path, body);
  return response.data;
};

const deleteTask = async ({
  groupId,
  taskListId,
  taskId,
}: DeleteTaskParams): Promise<boolean> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}`;
  const response = await instance.delete(path);
  return response.status === 204;
};

const orderTask = async ({
  groupId,
  taskListId,
  id,
  displayIndex,
}: OrderTaskParams): Promise<boolean> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks/${id}/order`;
  const response = await instance.patch(path, {
    displayIndex,
  });
  return response.status === 204;
};

/**
 * task 객체의 recurringId 필드, 반복설정으로 생성된 할일이 아닌, 반복설정 자체를 삭제)
 */
const deleteRecurring = async ({
  groupId,
  taskListId,
  taskId,
  recurringId,
}: DeleteRecurringParams): Promise<boolean> => {
  const path = `/groups/${groupId}/task-lists/${taskListId}/tasks/${taskId}/recurring/${recurringId}`;
  const response = await instance.delete(path);
  return response.status === 204;
};

export {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  orderTask,
  deleteRecurring,
};
