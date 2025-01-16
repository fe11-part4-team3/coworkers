import { ITask } from './task.type';

interface ITaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: ITask[];
}

interface GetTaskListParams {
  groupId: number;
  id: number;
  date: string;
}

interface UpdateTaskListParams {
  groupId: number;
  id: number;
  name: string;
}

interface UpdateTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface DeleteTaskListParams {
  groupId: number;
  id: number;
}

interface CreateTaskListParams {
  groupId: number;
  name: string;
}

interface CreateTaskListResponse {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}

interface OrderTaskListParams {
  groupId: number;
  id: number;
  displayIndex: number;
}

export type {
  ITaskList,
  GetTaskListParams,
  UpdateTaskListParams,
  UpdateTaskListResponse,
  DeleteTaskListParams,
  CreateTaskListParams,
  CreateTaskListResponse,
  OrderTaskListParams,
};
