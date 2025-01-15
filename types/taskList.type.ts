import { IUserProfile } from './user.type';

enum FrequencyType {
  DAILY,
  WEEKLY,
  MONTHLY,
  ONCE,
}

interface ITaskMetadata {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: FrequencyType;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}

interface ITask extends ITaskMetadata {
  doneBy: {
    user: IUserProfile | null;
  } | null;
  writer: IUserProfile | null;
}

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
  ITaskMetadata,
  ITask,
  ITaskList,
  GetTaskListParams,
  UpdateTaskListParams,
  UpdateTaskListResponse,
  DeleteTaskListParams,
  CreateTaskListParams,
  CreateTaskListResponse,
  OrderTaskListParams,
};
