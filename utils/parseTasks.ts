import { ITask } from '@/types/task.type';

export interface IParsedTasks {
  length: number;
  todo: ITask[];
  done: ITask[];
}

const parseTasks = (tasks: ITask[]) => {
  const prasedTasks: IParsedTasks = {
    length: 0,
    todo: [],
    done: [],
  };
  tasks.forEach((task) => {
    if (task.deletedAt) return;
    if (task.doneAt) prasedTasks.done.push(task);
    else prasedTasks.todo.push(task);
    prasedTasks.length++;
  });
  return prasedTasks;
};

export default parseTasks;
