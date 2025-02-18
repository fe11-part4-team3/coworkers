'use client';

import classNames from 'classnames';
import { isBefore } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';
import { useToggle } from '@/hooks/useToggle';

/**
 * DatePicker 컴포넌트는 달력을 표시하고 선택한 날짜를 반환합니다.
 *
 * @param {Date} props.selectedDate - 선택된 날짜
 * @param {Function} props.onDateChange - 날짜 변경 시 호출되는 함수
 * @param {ReactNode} props.children - 캘린더 오픈 트리거
 * @param {string} props.className - 컴포넌트 스타일 클래스
 * @param {boolean} props.allowPastDates - 과거 날짜 선택 허용 여부
 */
export default function DatePicker({
  selectedDate,
  onDateChange,
  children,
  className,
  prevDates = true,
}: {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  children: React.ReactNode;
  className?: string;
  prevDates?: boolean;
}) {
  const [isOpen, toggleIsOpen] = useToggle();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
          disabled={(date) => !prevDates && isBefore(date, today)}
          className={classNames(
            'absolute left-0 z-10 flex min-h-pr-258 w-full items-center justify-center rounded-2xl border border-brand-primary bg-b-secondary p-pr-16',
            className,
          )}
        />
      )}
    </div>
  );
}
