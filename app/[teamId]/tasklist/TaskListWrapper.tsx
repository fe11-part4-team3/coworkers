import KebabDropDown from '@/components/KebabDropDown';
import TaskCard from '@/components/TaskCard/TaskCard';
import {
  CustomDrawerContent,
  Drawer,
  DrawerClose,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';
import Image from 'next/image';
import { useState } from 'react';

interface TaskListWrapper {
  taskList: ITaskList | null;
}

export default function TaskListWrapper({ taskList }: TaskListWrapper) {
  const [task, setTask] = useState<ITask | null>(null);

  if (!taskList) return null;

  return (
    <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16">
      <Drawer direction="right">
        {taskList.tasks.map((task) => (
          <DrawerTrigger asChild key={task.id} onClick={() => setTask(task)}>
            <div>
              <TaskCard type="taskList" taskData={task} />
            </div>
          </DrawerTrigger>
        ))}
        <CustomDrawerContent className="inset-y-0 right-0 w-pr-780 p-pr-40">
          <DrawerClose asChild style={{ position: 'static' }}>
            <button className="absolute right-pr-25 top-pr-16 text-gray-500">
              <Image
                width={20}
                height={20}
                src="/images/icon-close.svg"
                alt="닫기 버튼"
              />
            </button>
          </DrawerClose>
          <DrawerHeader className="flex items-center justify-between">
            <DrawerTitle>{task?.name}</DrawerTitle>
            <KebabDropDown onEdit={() => {}} onDelete={() => {}} />
          </DrawerHeader>
          <DrawerDescription>{task?.description}</DrawerDescription>
          <DrawerFooter></DrawerFooter>
        </CustomDrawerContent>
      </Drawer>
    </div>
  );
}
