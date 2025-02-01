import { Pie, PieChart, Label } from 'recharts';

import { ITaskList } from '@/types/taskList.type';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import parseTasks from '@/utils/parseTasks';

interface TodayTasksChartProps {
  taskLists: ITaskList[];
  state: 'todo' | 'done';
  text: string;
}

const COLOR = [
  'var(--point-purple)',
  'var(--point-blue)',
  'var(--point-cyan)',
  'var(--point-pink)',
  'var(--point-rose)',
  'var(--point-orange)',
  'var(--point-yellow)',
];

const ANGLE = {
  todo: {
    start: -90,
    end: 270,
  },
  done: {
    start: 0,
    end: 360,
  },
};

export default function TodayTasksChart({
  taskLists,
  state,
  text,
}: TodayTasksChartProps) {
  const chartConfig = {} satisfies ChartConfig;

  let total = 0;

  const chartData = taskLists.map((taskList, i) => {
    const parsedTasks = parseTasks(taskList.tasks);
    total += parsedTasks[state].length;
    return {
      name: taskList.name,
      [state]: parsedTasks[state].length,
      fill: COLOR[i % COLOR.length],
    };
  });

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-pr-200 min-w-pr-200"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey={state}
          nameKey="name"
          startAngle={ANGLE[state].start}
          endAngle={ANGLE[state].end}
          innerRadius={70}
          outerRadius={90}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {total}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      {text}
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
