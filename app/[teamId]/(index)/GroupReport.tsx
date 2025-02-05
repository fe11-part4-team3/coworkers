import { useState } from 'react';

import { ITask } from '@/types/task.type';
import { ITaskList } from '@/types/taskList.type';

import GroupReportContent from './GroupReportContent';
import ReportSwitch from './GroupSwitch';

interface GroupReportProps {
  tasks: ITask[];
  taskLists: ITaskList[] | null;
}

export default function GroupReports({ tasks, taskLists }: GroupReportProps) {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="mb-pr-16">리포트</h3>
        <ReportSwitch
          checked={showChart}
          onCheckedChange={() => setShowChart((prev) => !prev)}
        />
      </div>
      <GroupReportContent tasks={tasks} taskLists={taskLists} />
    </div>
  );
}
