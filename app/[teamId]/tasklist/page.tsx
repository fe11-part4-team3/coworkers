'use client';

import { useState, useEffect } from 'react';
import 'dayjs/locale/ko';
import Link from 'next/link';
import classNames from 'classnames';
import { useSearchParams } from 'next/navigation';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import useTaskLists from '@/hooks/useTaskLists';
import { ITaskList } from '@/types/taskList.type';
import createUrlString from '@/utils/createUrlString';
import useDate from '@/hooks/useDate';
import DatePicker from '@/components/DateTimePicker/DatePicker';

import TaskListWrapper from './TaskListWrapper';

export default function TaskListPage() {
  const { openModal } = useModalStore();

  const { kstDate, prev, next, date, set } = useDate();
  const { groupId } = useGroup();
  const { taskLists } = useTaskLists();
  const taskListId = Number(useSearchParams().get('id'));
  const [taskList, setTaskList] = useState<ITaskList | null>(null);

  // const fetchUpdateTask = useMutation({
  //   mutationFn: ({
  //     taskId,
  //     body,
  //   }: {
  //     taskId: number;
  //     body: UpdateTaskBodyParams;
  //   }) => updateTask({ groupId, taskListId, taskId, body }),
  //   onSuccess: () => {
  //     refetchById(taskListId);
  //     showSnackbar('할 일이 수정되었습니다.');
  //   },
  //   onError: () => showSnackbar('할 일 수정할 수 없습니다.', 'error'),
  // });

  // const fetchDeleteTask = useMutation({
  //   mutationFn: (taskId: number) => deleteTask({ groupId, taskListId, taskId }),
  //   onSuccess: () => {
  //     refetchById(taskListId);
  //     showSnackbar('할 일이 삭제되었습니다.');
  //   },
  //   onError: () => showSnackbar('할 일을 삭제할 수 없습니다.', 'error'),
  // });

  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (ref.current && !ref.current.contains(event.target as Node)) {
  //       setIsCalendarOpen(false);
  //     }
  //   };
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => document.removeEventListener('mousedown', handleClickOutside);
  // }, [ref]);

  useEffect(() => {
    const next = taskLists?.find((e) => e.id === taskListId) || null;
    setTaskList(next);
  }, [taskLists, taskListId]);

  return (
    <>
      <Container className="relative h-screen">
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="relative mt-pr-24 flex items-center">
            <span className="w-pr-110 text-16m">{kstDate}</span>
            <div className="flex items-center gap-pr-12 text-b-secondary">
              <div className="flex items-center gap-pr-4">
                <PrevButtonIcon
                  className="size-pr-16 cursor-pointer"
                  onClick={prev}
                  width={16}
                  height={16}
                />
                <NextButtonIcon
                  className="size-pr-16 cursor-pointer"
                  onClick={next}
                  width={16}
                  height={16}
                />
              </div>
              <DatePicker
                selectedDate={new Date(date)}
                onDateChange={set}
                className="top-pr-40 w-pr-336 text-t-primary mo:-left-pr-168 mo:w-pr-288"
              >
                <CalendarButtonIcon className="cursor-pointer" />
              </DatePicker>
            </div>
          </div>
        </div>
        <ul className="mt-pr-24 flex gap-pr-12 text-16m">
          {taskLists?.map((taskList) => (
            <Link
              href={createUrlString({
                pathname: [groupId, 'tasklist'],
                queryParams: { id: taskList.id },
              })}
              key={taskList.id}
            >
              <li
                className={classNames(
                  taskList.id === taskListId
                    ? 'text-t-primary'
                    : 'text-t-default',
                  `cursor-pointer`,
                )}
              >
                {taskList.name}
              </li>
            </Link>
          ))}
        </ul>
        <TaskListWrapper taskList={taskList} />
      </Container>
      <div className="fixed bottom-pr-48 left-1/2 flex w-full max-w-screen-xl -translate-x-1/2 items-end justify-end tamo:bottom-pr-24 tamo:pr-pr-24">
        <Buttons
          text="할 일 추가"
          icon={<PlusIcon width={16} height={16} />}
          onClick={() => openModal(<AddTask />)}
          className="w-pr-125"
          rounded
        />
      </div>
    </>
  );
}
