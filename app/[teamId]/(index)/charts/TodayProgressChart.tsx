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
  todo: 'var(--s-danger)',
};

const chartConfig = {
  done: {
    label: 'Done',
    color: 'hsl(var(--brand-primary))',
  },
  todo: {
    label: 'Todo',
    color: 'hsl(var(--s-danger))',
  },
} satisfies ChartConfig;

interface TodayProgressChartProps {
  tasks: ITask[];
}

export default function TodayProgressChart({ tasks }: TodayProgressChartProps) {
  const { length, done, todo } = parseTasks(tasks);

  const chartData = [
    todo.length
      ? { done: done.length, todo: todo.length }
      : { done: 1, todo: 0 },
  ];
  const progress = length ? Math.round((done.length / length) * 100) : 100;

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-square max-h-pr-250 min-w-pr-250"
    >
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={360}
        innerRadius={80}
        outerRadius={130}
      >
        <defs>
          <linearGradient id="doneGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#a3e635" />
          </linearGradient>
          <linearGradient id="todoGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
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
                      {`${progress}%`}
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
          cornerRadius={5}
          fill="url(#doneGradient)"
          className="stroke-transparent stroke-2"
        />
        <RadialBar
          dataKey="todo"
          fill="url(#todoGradient)"
          stackId="a"
          cornerRadius={5}
          className="stroke-transparent stroke-2"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
