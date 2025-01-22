'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {string} width - optional, DatePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} DatePicker 컴포넌트를 반환합니다.
 */

export default function DatePicker({ width = 'full' }: { width?: string }) {
  const [date, setdate] = useState<Date | undefined>(undefined);

  console.log(date);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setdate}
      className={`${width !== 'full' ? `w-pr-${width}` : 'w-full'} flex items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16`}
    />
  );
}
