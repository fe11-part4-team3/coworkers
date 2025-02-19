import { Ref } from 'react';

import { ITask, ITaskMetadata } from '../types/task.type';

type TaskName = string;

interface HistoryTaskCardProps {
  type: 'history';
  task: ITaskMetadata;
  onToggle?: undefined;
  onClick?: undefined;
}

interface TaskListTaskCardProps {
  type: 'taskList';
  task: ITask;
  onToggle: () => void;
  onClick: () => void;
}

type TaskCardProps = HistoryTaskCardProps | TaskListTaskCardProps;

interface IconTextProps {
  text: string | number;
  type: 'calendar' | 'time' | 'repeat' | 'commentCount';
  fontSize?: 'S' | 'M';
  fontColor?: string;
  hasBar?: boolean;
}

interface TaskCheckboxProps {
  ref: Ref<HTMLDivElement>;
  name: TaskName;
  isChecked: boolean;
  onToggle?: () => void;
  isTaskList: boolean;
}

export type { TaskCardProps, IconTextProps, TaskCheckboxProps };
