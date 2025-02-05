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

import TodayTasksChart from './charts/TodayTasksChart';
import TodayProgressChart from './charts/TodayProgressChart';

interface GroupReportContentProps {
  tasks: ITask[];
  taskLists: ITaskList[] | null;
}

export default function GroupReportContent({
  tasks,
  taskLists,
}: GroupReportContentProps) {
  const deviceType = useDeviceType();

  return (
    <div className="flex h-pr-250 select-none items-center justify-around rounded-pr-12 bg-b-secondary p-pr-24 xmo:h-fit xmo:flex-col">
      <TodayProgressChart tasks={tasks} />
      {deviceType === 'mobile' ? (
        <MobileContent taskLists={taskLists || []} />
      ) : (
        <DefaultContent taskLists={taskLists || []} />
      )}
    </div>
  );
}

function DefaultContent({ taskLists }: { taskLists: ITaskList[] }) {
  return (
    <>
      <Separator orientation="vertical" className="xmo:hidden" />
      <TodayTasksChart state="todo" taskLists={taskLists || []} />
      <Separator orientation="vertical" className="xmo:hidden" />
      <TodayTasksChart state="done" taskLists={taskLists || []} />
    </>
  );
}

function MobileContent({ taskLists }: { taskLists: ITaskList[] }) {
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
