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
    if (type !== contentType) {
      setIsVisible(false);

      setTimeout(() => {
        setContentType(type);
        setIsVisible(true);
      }, 300);
    }
  }, [type]);

  return (
    <div className="select-none rounded-pr-12 bg-b-secondary">
      <div
        className={classNames(
          'team_xmo:h-fit team_xmo:flex-col flex h-pr-250 items-center p-pr-24 transition-opacity duration-300',

          contentType === 'chart' ? 'justify-around' : 'justify-between',
          contentType === 'text' && 'mo:h-fit mo:flex-col',
          isVisible ? 'opacity-100' : 'opacity-0',
        )}
      >
        <TodayProgressChart tasks={tasks} />

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
    <>
      <Separator orientation="horizontal" className="my-4 hidden mo:block" />
      <div className="flex w-pr-400 flex-col items-center gap-pr-16 mo:w-full ta:w-1/2">
        <TextContentCard tasks={todo} text="오늘의 할 일" icon={<IconTodo />} />
        <TextContentCard tasks={done} text="한 일" icon={<IconDone />} />
      </div>
    </>
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
      <Separator orientation="vertical" className="team_xmo:hidden" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <Separator orientation="vertical" className="team_xmo:hidden" />
      <TodayTasksChart state="done" taskLists={taskLists || []} />
    </>
  );
}

function MobileChartContent({ taskLists }: ChartContentProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <>
      <Separator
        orientation="horizontal"
        className="team_xmo:block my-4 hidden"
      />
      <Separator orientation="vertical" className="team_xmo:hidden" />
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
        <div className="flex justify-center gap-pr-8">
          <div
            className={`size-pr-12 rounded-full transition-all duration-300 ${current ? 'bg-b-tertiary' : 'bg-t-primary'}`}
          />
          <div
            className={`size-pr-12 rounded-full transition-all duration-300 ${current ? 'bg-t-primary' : 'bg-b-tertiary'}`}
          />
        </div>
      </div>
    </>
  );
}
