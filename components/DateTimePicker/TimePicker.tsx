'use client';

import { useState, useCallback } from 'react';

import InputField from '@/components/InputField/InputField';

/**
 * TimePicker 컴포넌트는 시간을 선택할 수 있는 기능을 제공합니다.
 * @param {string} width - optional, TimePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} TimePicker 컴포넌트를 반환합니다.
 */

export default function TimePicker({ width }: { width?: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');
  const [amPm, setAmPm] = useState<'am' | 'pm'>('am');

  const widthStyle = width ? `w-pr-${width}` : 'w-full';
  const timeButtonStyle = {
    default: 'h-pr-40 w-pr-78 rounded-xl bg-b-primary text-14m text-t-default',
    active: 'bg-brand-primary text-t-primary',
  };
  const selectTimeButtonStyle = (timeSlot: string) => {
    const isSelected = time === timeSlot;
    return isSelected ? 'text-brand-primary' : '';
  };

  const getButtonClass = (period: 'am' | 'pm') => {
    return `${timeButtonStyle.default} ${amPm === period ? timeButtonStyle.active : timeButtonStyle.default}`;
  };

  const timeSlots = useCallback(() => {
    const slots: string[] = [];
    for (let i = 1; i <= 12; i++) {
      slots.push(`${String(i)}:00`);
      slots.push(`${String(i)}:30`);
    }
    return slots;
  }, []);

  const handleTimeClick = (timeSlot: string) => {
    setTime(timeSlot);
    setIsOpen(false);
  };

  return (
    <>
      <div className={`flex flex-col gap-pr-8 ${widthStyle}`}>
        <div className="relative">
          <InputField
            value={
              time ? (amPm === 'am' ? `오전 ${time}` : `오후 ${time}`) : ''
            }
            placeholder="시간을 선택해주세요."
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
          <div className="flex gap-pr-14 rounded-xl border border-brand-primary bg-b-secondary p-pr-12">
            <div className="flex flex-col gap-pr-8">
              <button
                onClick={() => setAmPm('am')}
                className={getButtonClass('am')}
              >
                오전
              </button>
              <button
                onClick={() => setAmPm('pm')}
                className={getButtonClass('pm')}
              >
                오후
              </button>
            </div>
            <ol className="scrollbar flex h-pr-152 w-full list-none flex-col gap-pr-16 overflow-y-auto rounded-xl bg-b-primary p-pr-16 text-16 text-t-default">
              {timeSlots().map((timeSlot, index) => {
                const isSelected = time === timeSlot;
                return (
                  <button
                    key={index}
                    onClick={() => handleTimeClick(timeSlot)}
                    className={`text-left ${selectTimeButtonStyle(timeSlot)}`}
                  >
                    <li>{timeSlot}</li>
                  </button>
                );
              })}
            </ol>
          </div>
        )}
      </div>
    </>
  );
}
