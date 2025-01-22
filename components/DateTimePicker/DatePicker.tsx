'use client';

import { useState } from 'react';
import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import InputField from '@/components/InputField/InputField';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {string} width - optional, DatePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} DatePicker 컴포넌트를 반환합니다.
 */

export default function DatePicker({ width = 'full' }: { width?: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [date, setdate] = useState<Date | undefined>(undefined);
  const formattedDate = date ? format(date, 'yyyy년 mm월 dd일') : '';

  return (
    <>
      <div
        className={`${`${width !== 'full' ? `w-pr-${width}` : 'w-full'}`} flex flex-col gap-pr-8`}
      >
        <div className="relative">
          <InputField
            value={formattedDate}
            placeholder="날짜를 선택해주세요."
            disabled={true}
            onChange={() => {}}
            name="date"
          />
          <button
            className={`z-90 absolute left-0 top-0 size-full rounded-xl ${isOpen ? 'border border-brand-primary' : ''}`}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
        {isOpen && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setdate}
            className="flex w-full items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16"
          />
        )}
      </div>
    </>
  );
}
