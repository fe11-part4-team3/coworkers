import KebabDropDown from '@/components/KebabDropDown';
import Profile from '@/components/Profile/Profile';
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
import { format } from 'date-fns';
import Image from 'next/image';
import { useRef, useState } from 'react';

import IconLabel from '@/components/IconLabel';
import IconEnter from '@/public/images/icon-enter.svg';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { getTaskComment } from '@/service/comment.api';
import Comment from '@/components/Comment/Comment';

const REPEAT = {
  ONCE: '반복 없음',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

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
            {/* div 박스가 없으면 trigger가 동작하지 않습니다. */}
            <div>
              <TaskCard type="taskList" taskData={task} />
            </div>
          </DrawerTrigger>
        ))}
        {task && <TaskDetail task={task} />}
      </Drawer>
    </div>
  );
}

function TaskDetail({ task }: { task: ITask }) {
  const valid = true;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: comments } = useQuery({
    queryKey: ['comments', task.id],
    queryFn: () => getTaskComment({ taskId: task.id }),
    enabled: !!task,
  });

  const updatedAt = format(new Date(task.updatedAt), 'yyyy.MM.dd');
  const date = format(new Date(task.date), 'yyyy년 M월 dd일');
  const time = format(new Date(task.date), '오후 h:mm');

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 64)}px`;
    }
  };

  return (
    <CustomDrawerContent className="inset-y-0 right-0 w-pr-780 gap-pr-16 p-pr-40">
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

      {/* SECTION - Header */}
      <DrawerHeader className="w-full gap-pr-16 p-0">
        <div className="flex items-center justify-between">
          <DrawerTitle>{task.name}</DrawerTitle>
          <KebabDropDown onEdit={() => {}} onDelete={() => {}} />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-pr-12">
            <Profile
              variant="member"
              image={task.writer?.image}
              profileSize={32}
            />
            <span className="text-14m">{task.writer?.nickname}</span>
          </div>
          <span className="text-14">{updatedAt}</span>
        </div>
        <div className="flex items-center text-14">
          <IconLabel text={date} type="calendar" hasBar />
          <IconLabel text={time} type="time" hasBar />
          <IconLabel text={REPEAT[task.frequency]} type="repeat" />
        </div>
      </DrawerHeader>

      {/* SECTION - Description */}
      <div className="min-h-280 text-14">
        <DrawerDescription>{task.description}</DrawerDescription>
      </div>

      {/* SECTION - Comment */}
      <div>
        <div className="flex items-center border border-x-0 border-input py-pr-12">
          <textarea
            className="grow resize-none bg-transparent text-14 outline-none placeholder:text-t-default"
            ref={textareaRef}
            name="comment"
            rows={1}
            onChange={handleInput}
            placeholder="댓글을 달아주세요"
          />
          <button
            type="submit"
            className={classNames([
              'flex items-center justify-center',
              'size-pr-24 shrink-0 rounded-full',
              valid ? 'bg-brand-primary' : 'bg-t-default',
            ])}
            children={<IconEnter />}
          />
        </div>
        <div>
          {comments?.map((comment) => (
            <Comment
              key={comment.id}
              type="task"
              commentData={comment}
              handleDeleteClick={() => {}}
              handleUpdateSubmit={() => {}}
            />
          ))}
        </div>
      </div>

      <DrawerFooter></DrawerFooter>
    </CustomDrawerContent>
  );
}
