import { Ref } from 'react';

import { ITask } from '../types/task.type';

type TaskName = string;

interface TaskCardProps {
  type: 'history' | 'taskList';
  taskData: TaskData;
  updateTask?: (variables: {
    taskId: number;
    body: { name: string; description: string; done: boolean };
  }) => void;
  setTask?: (param: ITask | null) => void;
}

interface TaskData extends Partial<ITask> {
  id: number;
  name: string;
  date: string;
  doneAt: string | null;
  commentCount: number;
  frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
}

interface IconTextProps {
  text: string | number;
  type: 'calendar' | 'time' | 'repeat' | 'commentCount';
  fontSize?: 'S' | 'M';
  fontColor?: string;
  hasBar?: boolean;
}

interface TaskCheckboxProps {
  ref: Ref<HTMLInputElement>;
  name: TaskName;
  isChecked: boolean;
  handleCheckedToggle: () => void;
  isTaskList: boolean;
}

export type { TaskCardProps, TaskData, IconTextProps, TaskCheckboxProps };
