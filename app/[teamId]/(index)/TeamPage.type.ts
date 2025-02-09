import { UpdateGroupParams } from '@/types/group.type';

type _UpdateGroupParams = Omit<UpdateGroupParams, 'id'>;

interface _CreateTaskListParams {
  name: string;
}

interface _UpdateTaskListParams {
  id: number;
  name: string;
}

interface _DeleteTaskListParams {
  id: number;
}

export type {
  _UpdateGroupParams,
  _CreateTaskListParams,
  _UpdateTaskListParams,
  _DeleteTaskListParams,
};
