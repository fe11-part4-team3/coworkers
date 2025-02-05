import { useEffect, useState } from 'react';

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
      setIsVisible(false); // 기존 컨텐츠 페이드 아웃

      setTimeout(() => {
        setContentType(type); // 새로운 컨텐츠로 변경
        setIsVisible(true); // 새로운 컨텐츠 페이드 인
      }, 300); // 300ms 후 변경 (애니메이션 시간과 동일하게 설정)
    }
  }, [type]);

  return (
    <div className="select-none rounded-pr-12 bg-b-secondary">
      <div
        className={`flex h-pr-250 items-center p-pr-24 transition-opacity duration-300 xmo:h-fit xmo:flex-col ${
          contentType === 'chart' ? 'justify-around' : 'justify-between'
        } ${isVisible ? 'opacity-100' : 'opacity-0'}`}
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
  const parsedTasks = parseTasks(tasks);

  return (
    <>
      <Separator orientation="horizontal" className="my-4 hidden xmo:block" />
      <div className="flex flex-col gap-pr-16 xmo:flex-row">
        <div className="flex w-pr-400 items-center justify-between rounded-pr-12 bg-b-tertiary p-pr-16 transition-all duration-300 xmo:max-w-pr-132 mo:w-pr-182 ta:w-pr-280">
          <div className="flex flex-col gap-pr-4">
            <span className="text-12m text-t-secondary">오늘의 할 일</span>
            <span className="text-24b text-brand-tertiary">
              {parsedTasks.todo.length}
            </span>
          </div>
          <IconTodo />
        </div>
        <div className="flex w-pr-400 items-center justify-between rounded-pr-12 bg-b-tertiary p-pr-16 transition-all duration-300 xmo:max-w-pr-132 mo:w-pr-182 ta:w-pr-280">
          <div className="flex flex-col gap-pr-4">
            <span className="text-12m text-t-secondary">한 일</span>
            <span className="text-24b text-brand-tertiary">
              {parsedTasks.done.length}
            </span>
          </div>
          <IconDone />
        </div>
      </div>
    </>
  );
}

interface ChartContentProps {
  taskLists: ITaskList[];
}

function ChartContent({ taskLists }: ChartContentProps) {
  return (
    <>
      <Separator orientation="vertical" className="xmo:hidden" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <Separator orientation="vertical" className="xmo:hidden" />
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
      <Separator orientation="horizontal" className="my-4 hidden xmo:block" />
      <Separator orientation="vertical" className="xmo:hidden" />
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
