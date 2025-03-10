import { ReactNode, useEffect, useState } from 'react';
import classNames from 'classnames';

import { Separator } from '@/components/ui/separator';
import { useDeviceType } from '@/contexts/DeviceTypeContext';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import IconTodo from '@/public/images/icon-report-todo.svg';
import IconDone from '@/public/images/icon-report-done.svg';
import parseTasks from '@/utils/parseTasks';
import Indicators from '@/components/Indicators';

import TodayProgressChart from './charts/TodayProgressChart';
import TodayTasksChart from './charts/TodayTasksChart';

interface GroupReportContentProps {
  type: 'text' | 'chart';
  tasks: ITask[];
  taskLists: ITaskList[] | null;
}

export default function GroupReportContent({
  type,
  tasks,
  taskLists,
}: GroupReportContentProps) {
  const deviceType = useDeviceType();
  const [contentType, setContentType] = useState(type);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (type === contentType) return;
    setIsVisible(false);
    setTimeout(() => {
      setContentType(type);
      setIsVisible(true);
    }, 300);
  }, [type, contentType]);

  return (
    <div className="select-none rounded-pr-12 bg-b-secondary">
      <div
        className={classNames(
          'flex h-pr-250 items-center p-pr-24 transition-opacity duration-300',
          'mo:h-fit mo:flex-col',
          contentType === 'chart' ? 'justify-around' : 'justify-between',
          contentType === 'text' && 'mo:h-fit mo:flex-col',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <TodayProgressChart tasks={tasks} />

        <Separator orientation="horizontal" className="my-4 hidden mo:block" />

        {contentType === 'text' && <TextContent tasks={tasks} />}

        {contentType === 'chart' && deviceType === 'mobile' && (
          <MobileChartContent taskLists={taskLists || []} />
        )}
        {contentType === 'chart' && deviceType !== 'mobile' && (
          <ChartContent taskLists={taskLists || []} />
        )}
      </div>
    </div>
  );
}

interface TextContentProps {
  tasks: ITask[];
}

function TextContent({ tasks }: TextContentProps) {
  const { todo, done } = parseTasks(tasks);

  return (
    <div className="flex w-pr-400 flex-col items-center gap-pr-16 mo:w-full ta:w-1/2">
      <TextContentCard tasks={todo} text="오늘의 할 일" icon={<IconTodo />} />
      <TextContentCard tasks={done} text="한 일" icon={<IconDone />} />
    </div>
  );
}

interface TextContentCardProps {
  tasks: ITask[];
  text: string;
  icon: ReactNode;
}

function TextContentCard({ tasks, text, icon }: TextContentCardProps) {
  return (
    <div className="flex w-full items-center justify-between rounded-pr-12 bg-b-tertiary p-pr-16 transition-all duration-300">
      <div className="flex flex-col gap-pr-4">
        <span className="text-12m text-t-secondary">{text}</span>
        <span className="text-24b text-brand-tertiary">{tasks.length}개</span>
      </div>
      {icon}
    </div>
  );
}

interface ChartContentProps {
  taskLists: ITaskList[];
}

function ChartContent({ taskLists }: ChartContentProps) {
  return (
    <>
      <Separator orientation="vertical" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <Separator orientation="vertical" />
      <TodayTasksChart state="done" taskLists={taskLists || []} />
    </>
  );
}

function MobileChartContent({ taskLists }: ChartContentProps) {
  const [api, setApi] = useState<CarouselApi>();

  return (
    <div>
      <Carousel className="w-full max-w-pr-200" setApi={setApi}>
        <CarouselContent>
          <CarouselItem>
            <TodayTasksChart state="todo" taskLists={taskLists || []} />
          </CarouselItem>
          <CarouselItem>
            <TodayTasksChart state="done" taskLists={taskLists || []} />
          </CarouselItem>
        </CarouselContent>
      </Carousel>

      <Indicators api={api} />
    </div>
  );
}
