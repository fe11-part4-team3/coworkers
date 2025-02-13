import { useRouter } from 'next/navigation';

import { ITaskList } from '@/types/taskList.type';
import { RoleType } from '@/types/group.type';
import createUrlString from '@/utils/createUrlString';

import { _DeleteTaskListParams, _UpdateTaskListParams } from './TeamPage.type';
import { PointColorType } from './GroupTaskListWrapper';
import TaskProgressBadge from './TaskProgressBadge';
import DropDown from '@/components/DropDown';
import { MouseEvent, useRef } from 'react';

type IPointColorClasses = {
  [key in PointColorType]: string;
};

const POINT_COLOR_CLASSES: IPointColorClasses = {
  purple: 'bg-p-purple',
  blue: `bg-p-blue`,
  cyan: 'bg-p-cyan',
  pink: 'bg-p-pink',
  rose: 'bg-p-rose',
  orange: 'bg-p-orange',
  yellow: 'bg-p-yellow',
};

interface GroupTaskListProps {
  role: RoleType;
  taskList: ITaskList;
  pointColor: PointColorType;
  onEdit: (params: _UpdateTaskListParams) => void;
  onDelete: (params: _DeleteTaskListParams) => void;
}

export default function GroupTaskList({
  role,
  taskList,
  pointColor,
  onEdit,
  onDelete,
}: GroupTaskListProps) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickTaskList = (event: MouseEvent<HTMLDivElement>) => {
    if (dropdownRef.current?.contains(event.target as Node)) {
      return;
    }

    const url = createUrlString({
      pathname: [taskList.groupId, 'tasklist'],
      queryParams: { id: taskList.id },
    });
    router.push(url);
  };

  const handleClickEdit = () => {
    const name = prompt('목록 명을 입력해주세요');
    if (name) onEdit({ id: taskList.id, name });
  };

  const handleClickDelete = () => {
    const flag = confirm(`${taskList.name}을(를) 삭제 하시겠습니다?`);
    if (flag) onDelete({ id: taskList.id });
  };

  return (
    <div
      className="flex overflow-hidden rounded-pr-12 transition-all duration-300 hover:scale-[101%] hover:drop-shadow-lg"
      onClick={handleClickTaskList}
    >
      <div className={`w-pr-12 ${POINT_COLOR_CLASSES[pointColor]}`}></div>
      <div className="flex grow items-center justify-between bg-b-secondary px-pr-12 py-pr-10">
        <div>{taskList.name}</div>
        <div className="flex items-center gap-pr-4">
          <TaskProgressBadge tasks={taskList.tasks} />
          {role === 'ADMIN' && (
            <div className="size-pr-16">
              <DropDown
                ref={dropdownRef}
                trigger={<button className="icon-kebab absolute" />}
                items={[
                  { text: '수정하기', onClick: handleClickEdit },
                  { text: '삭제하기', onClick: handleClickDelete },
                ]}
                width="w-pr-120"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
