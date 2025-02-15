import { IUserProfile } from './user.type';
import { ITaskComment } from './comment.type';

type FrequencyType = 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'ONCE';

interface ITaskMetadata {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string | null;
  frequency: FrequencyType;
  description: string | null;
  name: string;
  recurringId: number;
  doneAt: string | null;
  date: string;
  updatedAt: string;
  id: number;
}

interface ITask extends Omit<ITaskMetadata, 'writerId' | 'userId'> {
  commentCount: number;
  doneBy: {
    user: IUserProfile | null;
  };
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

type UpdateTaskBodyParams = {
  name: string;
  description: string;
  done: boolean;
};

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
  body: UpdateTaskBodyParams;
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
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  value: ITask;
  commentData?: ITaskComment[];
  deleteTask: (taskId: number) => void;
  updateTask: (variables: {
    taskId: number;
    body: { name: string; description: string; done: boolean };
  }) => void;
  postComment: (variables: { taskId: number; content: string }) => void;
  deleteComment: (variables: { taskId: number; commentId: number }) => void;
  updateComment: (variables: {
    taskId: number;
    commentId: number;
    content: string;
  }) => void;
}

export type {
  FrequencyType,
  ITaskMetadata,
  ITask,
  TaskRecurringCreateDto,
  UpdateTaskBodyParams,
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
