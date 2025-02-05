import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import { Separator } from '@/components/ui/separator';
import { useDeviceType } from '@/contexts/DeviceTypeContext';

import TodayTasksChart from './charts/TodayTasksChart';
import TodayProgressChart from './charts/TodayProgressChart';

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import { useEffect, useState } from 'react';

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
    <div className="flex h-pr-250 select-none items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24 xmo:h-fit xmo:flex-col">
      <TodayProgressChart tasks={tasks} />
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
    </div>
  );
}
