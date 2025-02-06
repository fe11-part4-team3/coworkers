'use client';

import * as React from 'react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import ChevronLeftIcon from '@/public/images/icon-chevron-left.svg';
import ChevronRightIcon from '@/public/images/icon-chevron-right.svg';
import { useTheme } from 'next-themes';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
export type IsCalenderOpen = {
  setIsPickerView: (isOpen: boolean) => void;
};

export type CalendarPropsType = IsCalenderOpen & CalendarProps;

function Calendar({
  setIsPickerView,
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarPropsType) {
  const formatters = {
    formatWeekdayName: (date: Date) => {
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    },
  };

  const onDayClick = () => {
    setIsPickerView(false);
  };

  const { theme } = useTheme();

  return (
    <DayPicker
      onDayClick={onDayClick}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months:
          'w-full flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4 w-full',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm dark:text-t-inverse text-t-default',
        nav: 'flex justify-between items-center',
        nav_button_previous: 'absolute left-0',
        nav_button_next: 'absolute right-0',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex mb-2 justify-between',
        head_cell:
          'dark:text-t-inverse text-t-default rounded-md w-8 text-14sb',
        row: 'flex justify-between w-full',
        cell: cn(
          'relative p-0 text-t-primary text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md',
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-pr-34 w-pr-34 p-0 text-14m aria-selected:opacity-100',
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-brand-primary text-b-secondary hover:bg-primary hover:text-primary-foreground focus:bg-brand-primary focus:text-b-secondary',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-t-default aria-selected:bg-accent/50 aria-selected:text-b-secondary',
        day_disabled: 'text-t-default opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => (
          <ChevronLeftIcon
            width={24}
            height={24}
            style={{ fill: theme === 'dark' ? 'white' : 'black' }}
          />
        ),
        IconRight: () => (
          <ChevronRightIcon
            width={24}
            height={24}
            style={{ fill: theme === 'dark' ? 'white' : 'black' }}
          />
        ),
      }}
      formatters={formatters}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
