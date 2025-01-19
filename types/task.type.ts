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

interface TaskRecurringCreateBody {
  name: string;
  description?: string | null;
  startDate?: string;
}

interface MonthlyRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: FrequencyType.MONTHLY;
  monthDay: number;
}

interface WeeklyRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: FrequencyType.WEEKLY;
  weekDays: number[];
}

interface DailyRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: FrequencyType.DAILY;
}

interface OnceRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: FrequencyType.ONCE;
}

type TaskRecurringCreateDto =
  | MonthlyRecurringCreateBody
  | WeeklyRecurringCreateBody
  | DailyRecurringCreateBody
  | OnceRecurringCreateBody;

interface CreateTaskParams {
  groupId: number;
  taskListId: number;
  body: TaskRecurringCreateDto;
}

interface GetTasksParams {
  groupId: number;
  taskListId: number;
  date?: string;
}

interface GetTaskParams {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface UpdateTaskParams {
  groupId: number;
  taskListId: number;
  taskId: number;
  name?: string;
  description?: string;
  done?: boolean;
}

interface DeleteTaskParams {
  groupId: number;
  taskListId: number;
  taskId: number;
}

interface OrderTaskParams {
  groupId: number;
  taskListId: number;
  id: number;
  displayIndex: number;
}

interface DeleteRecurringParams {
  groupId: number;
  taskListId: number;
  taskId: number;
  recurringId: number;
}

export { FrequencyType };
export type {
  ITaskMetadata,
  ITask,
  TaskRecurringCreateDto,
  MonthlyRecurringCreateBody,
  WeeklyRecurringCreateBody,
  DailyRecurringCreateBody,
  OnceRecurringCreateBody,
  CreateTaskParams,
  GetTasksParams,
  GetTaskParams,
  UpdateTaskParams,
  DeleteTaskParams,
  OrderTaskParams,
  DeleteRecurringParams,
};
