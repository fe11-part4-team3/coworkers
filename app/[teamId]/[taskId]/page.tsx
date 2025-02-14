'use client';

import { subDays, addDays } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useQuery, useMutation } from '@tanstack/react-query';

import Container from '@/components/layout/Container';
import PrevButtonIcon from '@/public/images/icon-prev-button.svg';
import NextButtonIcon from '@/public/images/icon-next-button.svg';
import CalendarButtonIcon from '@/public/images/icon-calendar-button.svg';
import DatePicker from '@/components/DateTimePicker/DatePicker';
import useGroup from '@/hooks/useGroup';
import Buttons from '@/components/Buttons';
import PlusIcon from '@/public/images/icon-plus.svg';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import { getTaskList } from '@/service/taskList.api';
import { createTask } from '@/service/task.api';
import { TaskRecurringCreateDto } from '@/types/task.type';

export default function TaskListPage() {
  const [detailTaskId, setDetailTaskId] = useState<number | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  const { openModal } = useModalStore();

  const pathName = usePathname();
  const groupId = Number(pathName.split('/')[1]);
  const taskListId = Number(pathName.split('/')[2]);

  const { taskLists } = useGroup(groupId);

  const fetchGetTaskList = useQuery({
    queryKey: [
      'getTaskList',
      { groupId, taskListId, date: date?.toDateString() },
    ],
    queryFn: () =>
      getTaskList({ groupId, id: taskListId, date: date?.toDateString() }),
  });

  const fetchCreateTask = useMutation({
    mutationFn: (body: TaskRecurringCreateDto) =>
      createTask({ groupId, taskListId, body }),
    onSuccess: () => fetchGetTaskList.refetch(),
    onError: () => console.error('할 일 추가 실패'),
  });

  const handlePrevDate = () => {
    if (!date) return;
    setDate(subDays(date, 1));
  };

  const handleNextDate = () => {
    if (!date) return;
    setDate(addDays(date, 1));
  };

  dayjs.locale('ko');
  const formattedDate = dayjs(date).format('M월 D일 (ddd)');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    if (!date) return setDate(new Date());
    fetchGetTaskList.refetch();
  }, [date]);

  return (
    <>
      <Container>
        <div className="mt-pr-40 text-t-primary">
          <h1 className="text-20b">할 일</h1>
          <div className="relative mt-pr-24 flex items-center gap-pr-12">
            <span className="text-16m">{formattedDate}</span>
            <div
              className="flex items-center gap-pr-4 text-b-secondary"
              onClick={() => setDetailTaskId(null)}
              ref={ref}
            >
              <PrevButtonIcon
                className="cursor-pointer"
                onClick={handlePrevDate}
              />
              <NextButtonIcon
                className="cursor-pointer"
                onClick={handleNextDate}
              />
              <CalendarButtonIcon
                className="ml-pr-8 cursor-pointer"
                onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              />
              {isCalendarOpen && date && (
                <div className="absolute left-0 top-pr-50 z-50">
                  <DatePicker
                    width="w-pr-300"
                    date={date}
                    setDate={setDate}
                    setIsPickerView={setIsCalendarOpen}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <ul className="mt-pr-24 flex gap-pr-12 text-16m">
          {taskLists?.map((taskList) => (
            <Link href={`/${groupId}/${taskList.id}`} key={taskList.id}>
              <li
                className={`cursor-pointer ${taskList.id === taskListId ? 'text-t-primary' : 'text-t-default'}`}
              >
                {taskList.name}
              </li>
            </Link>
          ))}
        </ul>
        <div className="mb-pr-80 mt-pr-16 flex flex-col gap-pr-16"></div>
        <div
          className={`fixed bottom-pr-48 right-pr-80 ${detailTaskId ? 'hidden' : ''}`}
        >
          <div className="relative flex w-pr-116 items-center">
            <Buttons
              text="할 일 추가"
              rounded={true}
              icon={true}
              onClick={() =>
                openModal(<AddTask fetchData={fetchCreateTask.mutate} />)
              }
            />
            <PlusIcon width={24} height={24} className="absolute left-pr-12" />
          </div>
        </div>
      </Container>
    </>
  );
}
