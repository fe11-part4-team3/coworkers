import { DeleteMemberParams, UpdateGroupParams } from '@/types/group.type';
import {
  CreateTaskListParams,
  DeleteTaskListParams,
  UpdateTaskListParams,
} from '@/types/taskList.type';

type _UpdateGroupParams = Omit<UpdateGroupParams, 'id'>;

type _CreateTaskListParams = Omit<CreateTaskListParams, 'groupId'>;

type _UpdateTaskListParams = Omit<UpdateTaskListParams, 'groupId'>;

type _DeleteTaskListParams = Omit<DeleteTaskListParams, 'groupId'>;

type _DeleteMemberParams = Omit<DeleteMemberParams, 'id'>;

export type {
  _UpdateGroupParams,
  _CreateTaskListParams,
  _UpdateTaskListParams,
  _DeleteTaskListParams,
  _DeleteMemberParams,
};
