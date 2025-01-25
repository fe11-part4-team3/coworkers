import { ITaskListSummary } from '@/types/group.type';
import IconPlus from '@/public/images/icon-plus.svg';

import GroupTaskList from './GroupTaskList';
import { _CreateTaskListParams, _UpdateTaskListParams } from './page';

interface GroupTaskListWrapperProps {
  taskLists: ITaskListSummary[] | null;
  onCreate: (params: _CreateTaskListParams) => void;
  onEdit: ({ id, name }: _UpdateTaskListParams) => void;
  onDelete: (id: number) => void;
}

export type PointColorType =
  | 'purple'
  | 'blue'
  | 'cyan'
  | 'pink'
  | 'rose'
  | 'orange'
  | 'yellow';

const POINT_COLOR: PointColorType[] = [
  'purple',
  'blue',
  'cyan',
  'pink',
  'rose',
  'orange',
  'yellow',
];

export default function GroupTaskListWrapper({
  taskLists,
  onCreate,
  onEdit,
  onDelete,
}: GroupTaskListWrapperProps) {
  const handleClickCreate = () => {
    const name = prompt('목록 명을 입력해주세요', '직박구리');
    if (name) onCreate({ name });
  };

  const handleClickDelete = (name: string, id: number) => {
    const flag = confirm(`${name}을(를) 삭제 하시겠습니다?`);
    if (flag) onDelete(id);
  };

  //TODO 수정하기 핸들러

  return (
    <div className="flex flex-col gap-pr-16">
      <div className="flex">
        <div className="grow">
          <span className="text-16m text-t-primary">할 일 목록</span>
          <span className="text-16m text-t-default">
            &nbsp;({taskLists?.length || 0}개)
          </span>
        </div>
        <button
          className="flex bg-inherit text-brand-primary underline-offset-2 hover:underline"
          onClick={handleClickCreate}
        >
          <IconPlus width={17} height={17} />
          <span className="text-14">새로운 목록 추가하기</span>
        </button>
      </div>
      {taskLists?.map((taskList, i) => (
        <GroupTaskList
          key={taskList.id}
          taskList={taskList}
          pointColor={POINT_COLOR[i % POINT_COLOR.length]}
          onEdit={onEdit}
          onDelete={handleClickDelete}
        />
      ))}
    </div>
  );
}
