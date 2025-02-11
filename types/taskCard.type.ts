type TaskName = string;

interface TaskCardProps {
  type: 'history' | 'taskList';
  taskData: taskData;
}

interface taskData {
  id: number;
  name: string;
  date: string;
  doneAt: string | null;
  commentCount: number;
  frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | string;
}

interface IconTextProps {
  text: string | number;
  type: 'calendar' | 'time' | 'repeat' | 'commentCount';
  fontSize?: 'S' | 'M';
  fontColor?: string;
  hasBar?: boolean;
}

interface TaskCheckboxProps {
  name: TaskName;
  isChecked: boolean;
  handleCheckedToggle: () => void;
  isTaskList: boolean;
}

export type { TaskCardProps, IconTextProps, TaskCheckboxProps };
