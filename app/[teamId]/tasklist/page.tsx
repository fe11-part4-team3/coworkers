'use client';

import DatePicker from '@/components/DateTimePicker/DatePicker';

export default function TaskListPage() {
  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <DatePicker />
      </div>
    </>
  );
}
