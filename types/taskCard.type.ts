interface TaskCardProps {
  name: string;
  date: string;
  doneAt: string | null;
  commentCount: number;
  frequency: string;
}

interface IconTextProps {
  text: string | number;
  type: 'calendar' | 'time' | 'repeat' | 'commentCount';
  hasBar?: true;
}

interface TaskCheckboxProps {
  name: string;
  isChecked: boolean;
  handleCheckedToggle: () => void;
}

export type {
  TaskCardProps,
  IconTextProps,
  TaskCheckboxProps,
};
