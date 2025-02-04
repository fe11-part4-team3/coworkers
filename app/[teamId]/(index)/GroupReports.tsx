import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';

import TodayProgressChart from './charts/TodayProgressChart';
import TodayTasksChart from './charts/TodayTasksChart';
import { Separator } from '@/components/ui/separator';

interface GroupReportsProps {
  tasks: ITask[];
  taskLists: ITaskList[] | null;
}

export default function GroupReports({ tasks, taskLists }: GroupReportsProps) {
  return (
    <div>
      <h3 className="mb-pr-16">리포트</h3>
      <div className="flex h-pr-250 items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24">
        <TodayProgressChart tasks={tasks} />
        <Separator orientation="vertical" />
        <TodayTasksChart state="todo" taskLists={taskLists || []} />
        <Separator orientation="vertical" />
        <TodayTasksChart state="done" taskLists={taskLists || []} />
      </div>
    </div>
  );
}
