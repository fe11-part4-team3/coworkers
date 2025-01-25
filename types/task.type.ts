import { IUserProfile } from './user.type';
import { ITaskComment } from './comment.type';

type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

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

interface ITask extends Omit<ITaskMetadata, 'writerId' | 'userId'> {
  commentCount: number;
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
  frequencyType: 'MONTHLY';
  monthDay: number;
}

interface WeeklyRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: 'WEEKLY';
  weekDays: number[];
}

interface DailyRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: 'DAILY';
}

interface OnceRecurringCreateBody extends TaskRecurringCreateBody {
  frequencyType: 'ONCE';
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

interface TaskDetailProps {
  value: ITask;
  commentData?: ITaskComment[];
  deleteTask: (id: number) => void;
  updateTask: (id: number) => void;
  updateTaskStatus: (id: number) => void;
  postComment: () => void;
  deleteComment: (id: number) => void;
  updateComment: (id: number) => void;
}

export type {
  FrequencyType,
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
  TaskDetailProps,
};
