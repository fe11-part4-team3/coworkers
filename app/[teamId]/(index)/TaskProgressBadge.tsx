import { ITask } from '@/types/task.type';
import IconTodo from '@/public/images/icon-state-todo.svg';
import IconDone from '@/public/images/icon-state-done.svg';
import useTaskLists from '@/hooks/useTaskLists';

interface TaskProgressBadgeProps {
  tasks: ITask[];
}

export default function TaskProgressBadge({ tasks }: TaskProgressBadgeProps) {
  const { parseTasks } = useTaskLists();
  const { length, done } = parseTasks(tasks);

  return (
    <div className="flex items-center gap-pr-8 rounded-pr-12 bg-b-primary px-pr-8 py-pr-4">
      {length === done.length ? <IconDone /> : <IconTodo />}
      <span className="text-14 text-brand-primary">{`${done.length}/${length}`}</span>
    </div>
  );
}
