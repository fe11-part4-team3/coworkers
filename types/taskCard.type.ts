type TaskName = string;

interface TaskCardProps {
  name: TaskName;
  date: string;
  doneAt: string | null;
  commentCount: number;
  frequency: string;
}

interface IconTextProps {
  text: string | number;
  type: 'calendar' | 'time' | 'repeat' | 'commentCount';
  hasBar?: boolean;
}

interface TaskCheckboxProps {
  name: TaskName;
  isChecked: boolean;
  handleCheckedToggle: () => void;
}

export type {
  TaskCardProps,
  IconTextProps,
  TaskCheckboxProps,
};
