import { ITaskListSummary } from '@/types/group.type';
import { PointColorType } from './GroupTaskListWrapper';
import KebabDropDown from '@/components/KebabDropDown';

interface GroupTaskListProps {
  taskList: ITaskListSummary;
  pointColor: PointColorType;
}

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

export default function GroupTaskList({
  taskList,
  pointColor,
}: GroupTaskListProps) {
  return (
    <div className="flex overflow-hidden rounded-pr-12 transition-all duration-300 hover:scale-[103%] hover:drop-shadow-lg">
      <div className={`w-pr-12 ${POINT_COLOR_CLASSES[pointColor]}`}></div>
      <div className="flex grow items-center justify-between bg-b-secondary px-pr-12 py-pr-10">
        <div>{taskList.name}</div>
        <div>
          <KebabDropDown onEdit={() => {}} onDelete={() => {}} />
        </div>
      </div>
    </div>
  );
}
