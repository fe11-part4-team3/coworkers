import { UpdateGroupParams } from '@/types/group.type';
import {
  CreateTaskListParams,
  DeleteTaskListParams,
  UpdateTaskListParams,
} from '@/types/taskList.type';

type _UpdateGroupParams = Omit<UpdateGroupParams, 'id'>;

type _CreateTaskListParams = Omit<CreateTaskListParams, 'groupId'>;

type _UpdateTaskListParams = Omit<UpdateTaskListParams, 'groupId'>;

type _DeleteTaskListParams = Omit<DeleteTaskListParams, 'groupId'>;

export type {
  _UpdateGroupParams,
  _CreateTaskListParams,
  _UpdateTaskListParams,
  _DeleteTaskListParams,
};
