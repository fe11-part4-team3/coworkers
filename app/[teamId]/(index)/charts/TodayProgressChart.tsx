import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';

import { ITask } from '@/types/task.type';
import parseTasks from '@/utils/parseTasks';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const COLOR = {
  done: 'var(--brand-primary)',
  todo: 'var(--b-tertiary-light)',
};

const chartConfig = {
  done: {
    label: 'Done',
    color: COLOR.done,
  },
  todo: {
    label: 'Todo',
    color: COLOR.todo,
  },
} satisfies ChartConfig;

interface TodayProgressChartProps {
  tasks: ITask[];
}

export default function TodayProgressChart({ tasks }: TodayProgressChartProps) {
  const { length, done, todo } = parseTasks(tasks);

  const chartData = [{ done: done.length, todo: todo.length }];
  const progress = length ? Math.round((done.length / length) * 100) : null;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-pr-200 min-w-pr-200"
    >
      <RadialBarChart
        data={chartData}
        startAngle={-45}
        endAngle={315}
        innerRadius={80}
        outerRadius={130}
      >
        {length && (
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent customColor={COLOR} hideLabel />}
          />
        )}

        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
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
                      className="fill-foreground text-4xl font-bold"
                    >
                      {length ? `${progress}%` : '할 일 없음'}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 24}
                      className="fill-muted-foreground"
                    >
                      오늘의 진행 상황
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="done"
          stackId="a"
          fill="var(--brand-primary)"
          cornerRadius={8}
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="todo"
          fill="var(--b-tertiary-light)"
          stackId="a"
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
