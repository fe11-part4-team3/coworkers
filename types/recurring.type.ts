import {
  FrequencyType,
  TaskRecurringCreateDto,
} from './task.type';

interface IRecurring {
  writerId: number;
  groupId: number;
  taskListId: number;
  monthDay: number;
  weekDays: number[];
  frequencyType: FrequencyType;
  startDate: string;
  updatedAt: string;
  createdAt: string;
  description: string;
  name: string;
  id: number;
}

interface CreateRecuringParams {
  groupId: number;
  taskListId: number;
  body: TaskRecurringCreateDto;
}

export type { IRecurring, CreateRecuringParams };
