'use client';

import classNames from 'classnames';

import { Calendar } from '@/components/ui/calendar';
import { useToggle } from '@/hooks/useToggle';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 * @param {Function} onDateChange - 날짜 변경 시 호출되는 함수
 */
export default function DatePicker({
  selectedDate,
  onDateChange,
  children,
  className,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  children: React.ReactNode;
  className?: string;
}) {
  const [isOpen, toggleIsOpen] = useToggle();

  return (
    <div className="relative flex w-full flex-col gap-pr-8">
      <div onClick={toggleIsOpen}>{children}</div>
      {isOpen && (
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={(date: Date | undefined) => {
            if (date) onDateChange(date);
          }}
          onDayClick={toggleIsOpen}
          className={classNames(
            'absolute left-0 top-pr-60 z-10 flex min-h-pr-258 w-full items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16',
            className,
          )}
        />
      )}
    </div>
  );
}
