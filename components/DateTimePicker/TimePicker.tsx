'use client';

import { useState, useCallback } from 'react';

import { widthStyledSliceWPr } from '@/utils/filterClass';

/**
 * TimePicker 컴포넌트는 시간을 선택할 수 있는 기능을 제공합니다.
 * @param {string} width - optional, TimePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @param {function} setTime - 선택한 시간을 반환하는 함수입니다.
 * @returns {JSX.Element} TimePicker 컴포넌트를 반환합니다.
 */

export default function TimePicker({
  width,
  setTime,
  setIsPickerView,
}: {
  width?: string;
  setTime: (time: string) => void;
  setIsPickerView: (isOpen: boolean | undefined) => void;
}) {
  const [amPm, setAmPm] = useState<'am' | 'pm'>('am');

  const timeButtonStyle = {
    default: 'h-pr-40 w-pr-78 rounded-xl bg-b-primary text-14m text-t-default',
    active: 'bg-brand-primary text-t-primary',
  };

  const getButtonClass = (period: 'am' | 'pm') => {
    return `${timeButtonStyle.default} ${amPm === period ? timeButtonStyle.active : timeButtonStyle.default}`;
  };

  const timeSlots = useCallback(() => {
    const slots: string[] = [];
    for (let i = 0; i <= 11; i++) {
      slots.push(`${String(i)}:00`);
      slots.push(`${String(i)}:30`);
    }
    return slots;
  }, []);

  const handleTimeClick = (timeSlot: string) => {
    setIsPickerView(false);

    let [hours] = timeSlot.split(':').map(Number);
    const [, minutes] = timeSlot.split(':').map(Number);
    if (amPm === 'pm') {
      hours += 12;
    }

    const newTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    setTime(newTime);
  };

  const handleTimeSlotClick = (AmPm: 'am' | 'pm') => {
    setAmPm(AmPm);
  };

  return (
    <>
      <div className={`${width ? widthStyledSliceWPr(width) : 'w-full'}`}>
        <div className="flex gap-pr-14 rounded-xl border border-brand-primary bg-b-secondary p-pr-12">
          <div className="flex flex-col gap-pr-8">
            <button
              onClick={() => handleTimeSlotClick('am')}
              className={getButtonClass('am')}
              type="button"
            >
              오전
            </button>
            <button
              onClick={() => handleTimeSlotClick('pm')}
              className={getButtonClass('pm')}
              type="button"
            >
              오후
            </button>
          </div>
          <ol className="scrollbar flex h-pr-152 w-full list-none flex-col gap-pr-16 overflow-y-auto rounded-xl bg-b-primary p-pr-16 text-16 text-t-default">
            {timeSlots().map((timeSlot, index) => {
              return (
                <button
                  key={index}
                  onClick={() => handleTimeClick(timeSlot)}
                  className={`text-left hover:text-brand-primary`}
                  type="button"
                >
                  <li>{timeSlot}</li>
                </button>
              );
            })}
          </ol>
        </div>
      </div>
    </>
  );
}
