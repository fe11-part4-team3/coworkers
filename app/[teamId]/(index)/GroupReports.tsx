import { useState } from 'react';

import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import { Separator } from '@/components/ui/separator';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

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

const TOOLTIP = {
  todo: '한 일 차트 보기',
  done: '할 일 차트 보기',
};

function MobileContent({ tasks, taskLists }: GroupReportsProps) {
  const [state, setState] = useState<'todo' | 'done'>('todo');

  return (
    <div className="flex h-pr-250 items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24 xmo:h-fit xmo:flex-col">
      <TodayProgressChart tasks={tasks} />
      <Separator orientation="horizontal" className="my-4 hidden xmo:block" />
      <Separator orientation="vertical" className="xmo:hidden" />
      <div className="relative">
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="absolute inset-0 z-10 m-auto size-pr-140 cursor-pointer rounded-full bg-b-tertiary opacity-0 transition-all hover:opacity-70 active:opacity-80"
              onClick={() =>
                setState((prev) => (prev === 'todo' ? 'done' : 'todo'))
              }
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>{TOOLTIP[state]}</p>
          </TooltipContent>
        </Tooltip>
        <TodayTasksChart state={state} taskLists={taskLists || []} />
      </div>
    </div>
  );
}
