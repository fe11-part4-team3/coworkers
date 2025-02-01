import { ITaskList } from '@/types/taskList.type';
import { Bar, BarChart, LabelList, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import parseTasks from '@/utils/parseTasks';
import { useMemo } from 'react';

interface TodayTasksChartProps {
  taskLists: ITaskList[];
  doneColor?: string;
  todoColor?: string;
  label?: boolean;
  type: 'bar' | 'radial';
}

export default function TodayTasksChart(props: TodayTasksChartProps) {
  if (props.type === 'bar') return <BarTypeChart {...props} />;
  return null;
}

function BarTypeChart({
  taskLists,
  doneColor,
  todoColor,
  label = true,
}: TodayTasksChartProps) {
  const COLOR = useMemo(
    () => ({
      done: doneColor || 'var(--brand-primary)',
      todo: todoColor || 'var(--s-danger)',
    }),
    [doneColor, todoColor],
  );

  const chartConfig = useMemo(
    () =>
      ({
        done: {
          label: 'Done',
          color: COLOR.done,
        },
        todo: {
          label: 'Todo',
          color: COLOR.todo,
        },
      }) satisfies ChartConfig,
    [COLOR],
  );

  return (
    <ChartContainer className="min-w-pr-250" config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={taskLists.map((taskList) => {
          const { done, todo } = parseTasks(taskList.tasks);
          return {
            name: taskList.name,
            done: done.length,
            todo: todo.length,
          };
        })}
      >
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="done" fill={COLOR.done} radius={[4, 4, 0, 0]}>
          {label && (
            <LabelList
              dataKey="done"
              position="top"
              offset={8}
              className="text-white"
              fontSize={12}
            />
          )}
        </Bar>
        <Bar dataKey="todo" fill={COLOR.todo} radius={[4, 4, 0, 0]}>
          {label && (
            <LabelList
              dataKey="todo"
              position="top"
              offset={8}
              className="text-white"
              fontSize={12}
            />
          )}
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
