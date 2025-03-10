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
}

const chartConfig = {
  todo: {
    label: '할 일',
  },
  done: {
    label: '완료됨',
  },
} satisfies ChartConfig;

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

const DESCRIPTION = {
  todo: '오늘 할 일',
  done: '한 일',
};

export default function TodayTasksChart({
  taskLists,
  state,
}: TodayTasksChartProps) {
  /**
   * 원래 const로 total을 구현하려 했지만
   * 딱히 중요한 데이터도 아니고, 로직 복잡도 증가와 성능도 감소해
   * let을 사용해 구현하게 되었습니다
   */
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

  /**
   * chartDate가 비어있을 경우 파이 차트가 렌더링 되지 않습니다
   * 그래서 빈 chartData일 때 파이차트를 렌더링 하기 위한 더미데이터입니다
   */
  const EmptyChartData = [{ name: 'none', [state]: 1, fill: 'none' }];

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-pr-200 min-w-pr-200"
    >
      <PieChart>
        {total && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
        )}
        <Pie
          data={total ? chartData : EmptyChartData}
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
                      {DESCRIPTION[state]}
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
