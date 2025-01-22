'use client';

import DatePicker from '@/components/DateTimePicker/DatePicker';
import TimePicker from '@/components/DateTimePicker/TimePicker';

export default function TaskListPage() {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-pr-30">
        <TimePicker width="300" />
        <DatePicker width="300" />
      </div>
    </>
  );
}
