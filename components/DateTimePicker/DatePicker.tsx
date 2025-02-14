'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/InputField/InputField';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {Function} onDateChange - 날짜 변경 시 호출되는 함수
 */
export default function DatePicker({
  onDateChange,
}: {
  onDateChange: (date: Date) => void;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setdate] = useState<Date>(new Date());

  const formattedDate = date ? format(date, 'yyyy년 MM월 dd일') : '';

  const handleDateSelect = (selectedDate: Date) => {
    setdate(selectedDate);
    onDateChange(selectedDate);
  };

  return (
    <>
      <div className="relative flex w-full flex-col gap-pr-8">
        <InputField
          value={formattedDate}
          name="date"
          onClick={() => setIsOpen(!isOpen)}
          readOnly
        />
        {isOpen && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={(selectedDate: Date | undefined) => {
              if (selectedDate) handleDateSelect(selectedDate);
            }}
            onDayClick={() => setIsOpen(false)}
            className="absolute left-0 top-pr-60 z-10 flex min-h-pr-258 w-full items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16"
          />
        )}
      </div>
    </>
  );
}
