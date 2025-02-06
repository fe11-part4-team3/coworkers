'use client';

import { Calendar } from '@/components/ui/calendar';
import { widthStyledSliceWPr } from '@/utils/filterClass';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {string} width - optional, DatePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} DatePicker 컴포넌트를 반환합니다.
 */

export default function DatePicker({
  width,
  date,
  setDate,
  setIsPickerView,
}: {
  width?: string;
  date: Date;
  setDate: (date: Date | undefined) => void;
  setIsPickerView: (isOpen: boolean) => void;
}) {
  return (
    <>
      <Calendar
        setIsPickerView={setIsPickerView}
        mode="single"
        selected={date}
        onSelect={setDate}
        className={`${width ? widthStyledSliceWPr(width) : 'w-full'} flex items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16`}
      />
    </>
  );
}
