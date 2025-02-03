import { ITask } from '@/types/task.type';
import TodayProgressChart from './charts/TodayProgressChart';

interface GroupReportsProps {
  tasks: ITask[];
}

export default function GroupReports({ tasks }: GroupReportsProps) {
  return (
    <div>
      <h3>리포트</h3>
      <div className="flex items-center rounded-pr-12 bg-b-secondary px-pr-24"></div>
      <TodayProgressChart tasks={tasks} />
    </div>
  );
}
