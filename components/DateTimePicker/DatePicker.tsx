'use client';

import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {string} width - optional, DatePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} DatePicker 컴포넌트를 반환합니다.
 */

/**
 * 아래는 컴포넌트 설명입니다.
 * 해당 컴포넌트는 shadcn에서 불러온 Calendar 컴포넌트를 사용합니다.
 * Calendar 컴포넌트는 mode, selected, onSelect, className을 props로 받습니다.
 *
 * mode : 달력의 모드를 설정합니다. (shadcn에서 single로 타입 제한되어 있습니다.)
 * selected : 선택된 날짜에 대한 value 값 (shadcn에서 Date | undefined로 타입 제한되어 있어서, state 또한 Date | undefined로 설정해야 합니다.)
 * onSelect : 날짜를 선택했을 때 실행되는 함수입니다. (setDate 넣었을 때, 해당 날짜로 state가 변경됩니다.)
 * className : 컴포넌트의 스타일을 지정합니다.
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
