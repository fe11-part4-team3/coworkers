import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import { Separator } from '@/components/ui/separator';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

import TodayTasksChart from './charts/TodayTasksChart';
import TodayProgressChart from './charts/TodayProgressChart';

interface GroupReportsProps {
  tasks: ITask[];
  taskLists: ITaskList[] | null;
}

export default function GroupReports({ tasks, taskLists }: GroupReportsProps) {
  const deviceType = useDeviceType();

  return (
    <div>
      <h3 className="mb-pr-16">리포트</h3>
      {deviceType !== 'mobile' ? (
        <DefaultContent tasks={tasks} taskLists={taskLists} />
      ) : (
        <MobileContent tasks={tasks} taskLists={taskLists} />
      )}
    </div>
  );
}

function DefaultContent({ tasks, taskLists }: GroupReportsProps) {
  return (
    <div className="flex h-pr-250 items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24">
      <TodayProgressChart tasks={tasks} />
      <Separator orientation="vertical" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <Separator orientation="vertical" />
      <TodayTasksChart state="done" taskLists={taskLists || []} />
    </div>
  );
}

function MobileContent({ tasks, taskLists }: GroupReportsProps) {
  return (
    <div className="flex h-pr-250 items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24 xmo:h-fit xmo:flex-col">
      <TodayProgressChart tasks={tasks} />
      <Separator orientation="horizontal" className="my-4 hidden xmo:block" />
      <Separator orientation="vertical" className="xmo:hidden" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <TodayTasksChart state="done" taskLists={taskLists || []} />
    </div>
  );
}
