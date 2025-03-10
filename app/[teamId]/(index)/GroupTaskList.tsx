import { useRouter } from 'next/navigation';
import { MouseEvent, useRef } from 'react';

import { ITaskList } from '@/types/taskList.type';
import { RoleType } from '@/types/group.type';
import createUrlString from '@/utils/createUrlString';
import useModalStore from '@/stores/modalStore';
import KebabDropDown from '@/components/KebabDropDown';

import { _DeleteTaskListParams, _UpdateTaskListParams } from './TeamPage.type';
import { PointColorType } from './GroupTaskListWrapper';
import TaskProgressBadge from './TaskProgressBadge';
import EditTaskListModal from './EditTaskListModal';
import DeleteTaskListModal from './DeleteTaskListModal';

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
  const { openModal } = useModalStore();

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
    openModal(<EditTaskListModal taskList={taskList} onEdit={onEdit} />);
  };

  const handleClickDelete = () => {
    openModal(
      <DeleteTaskListModal onDelete={() => onDelete({ id: taskList.id })} />,
    );
  };

  return (
    <div
      className="flex cursor-pointer overflow-hidden rounded-pr-12 transition-all duration-300 hover:scale-[101%] hover:drop-shadow-lg"
      onClick={handleClickTaskList}
    >
      <div className={`w-pr-12 ${POINT_COLOR_CLASSES[pointColor]}`}></div>
      <div className="flex grow items-center justify-between bg-b-secondary px-pr-12 py-pr-10">
        <div>{taskList.name}</div>
        <div className="flex items-center gap-pr-4">
          <TaskProgressBadge tasks={taskList.tasks} />
          {role === 'ADMIN' && (
            <KebabDropDown
              ref={dropdownRef}
              onEdit={handleClickEdit}
              onDelete={handleClickDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
