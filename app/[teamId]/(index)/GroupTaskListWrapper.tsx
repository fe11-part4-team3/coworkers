import { useState } from 'react';

import IconPlus from '@/public/images/icon-plus.svg';
import { ITaskList } from '@/types/taskList.type';
import { RoleType } from '@/types/group.type';
import useModalStore from '@/stores/modalStore';
import AddTaskList from '@/components/modal/AddTaskList';
import ArrowDown from '@/public/images/icon-arrow-down.svg';

import GroupTaskList from './GroupTaskList';
import {
  _CreateTaskListParams,
  _DeleteTaskListParams,
  _UpdateTaskListParams,
} from './TeamPage.type';

export type PointColorType =
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'pink'
  | 'rose'
  | 'orange'
  | 'yellow';

interface GroupTaskListWrapperProps {
  role: RoleType;
  taskLists: ITaskList[] | null;
  onCreate: (params: _CreateTaskListParams) => void;
  onEdit: (params: _UpdateTaskListParams) => void;
  onDelete: (params: _DeleteTaskListParams) => void;
}

const POINT_COLOR: PointColorType[] = [
  'purple',
  'blue',
  'cyan',
  'pink',
  'rose',
  'orange',
  'yellow',
];

// 기본으로 노출되는 할 일 목록의 수
const SIZE = 6;

export default function GroupTaskListWrapper({
  role,
  taskLists,
  onCreate,
  onEdit,
  onDelete,
}: GroupTaskListWrapperProps) {
  const [more, setMore] = useState(false);
  const { openModal } = useModalStore();

  const sortedTaskLists = taskLists?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const handleClickCreate = () =>
    openModal(<AddTaskList onCreate={onCreate} />);

  return (
    <div className="flex flex-col gap-pr-16">
      <div className="flex">
        <div className="grow">
          <span className="text-16m text-t-primary">할 일 목록</span>
          <span className="text-16m text-t-default">
            &nbsp;({taskLists?.length || 0}개)
          </span>
        </div>
        {role === 'ADMIN' && (
          <button
            className="flex bg-inherit text-brand-primary underline-offset-2 hover:underline"
            onClick={handleClickCreate}
          >
            <IconPlus width={17} height={17} />
            <span className="text-14">새로운 목록 추가하기</span>
          </button>
        )}
      </div>
      {taskLists &&
        sortedTaskLists?.map((taskList, i) => {
          return more || i < SIZE ? (
            <GroupTaskList
              key={taskList.id}
              role={role}
              taskList={taskList}
              pointColor={POINT_COLOR[i % POINT_COLOR.length]}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ) : null;
        })}
      {taskLists && taskLists?.length > SIZE && (
        <button
          className="m-auto flex w-fit items-center underline-offset-4 hover:underline"
          onClick={() => setMore((prev) => !prev)}
        >
          <ArrowDown className={more ? 'rotate-180' : ''} />
          <span>{more ? '간략히' : '더보기'}</span>
        </button>
      )}
    </div>
  );
}
