'use client';

import { useState } from 'react';
import Buttons from '@/components/Buttons';

/**
 * TimePicker 컴포넌트는 시간을 선택할 수 있는 기능을 제공합니다.
 * @param {string} width - optional, TimePicker 컴포넌트의 너비를 설정합니다. (기본 값은 w-full입니다.)
 * @returns {JSX.Element} TimePicker 컴포넌트를 반환합니다.
 */

export default function TimePicker({ width = 'full' }: { width?: string }) {
  const [time, setTime] = useState<string>('');
  const [amPm, setAmPm] = useState<'am' | 'pm'>('am');

  const amTimeSlots = [];
  const pmTimeSlots = [];

  for (let i = 0; i < 12; i++) {
    const hourTime = i;
    amTimeSlots.push(`${String(hourTime).padStart(2, '0')}:00`); // 정각
    amTimeSlots.push(`${String(hourTime).padStart(2, '0')}:30`); // 30분
  }

  for (let i = 12; i < 24; i++) {
    const hourTime = i;
    pmTimeSlots.push(`${String(hourTime).padStart(2, '0')}:00`); // 정각
    pmTimeSlots.push(`${String(hourTime).padStart(2, '0')}:30`);
  }

  console.log(time);

  return (
    <>
      <div
        className={`${width !== 'full' ? `w-pr-${width}` : 'w-full'} flex gap-pr-14 rounded-xl border border-brand-primary bg-b-secondary p-pr-12`}
      >
        <div className="flex flex-col gap-pr-8">
          <Buttons text="오전" onClick={() => setAmPm('am')} width="w-pr-78" />
          <Buttons text="오후" onClick={() => setAmPm('am')} width="w-pr-78" />
          <div className="flex flex-col gap-pr-8 bg-b-primary">
            <Buttons
              text="오전"
              onClick={() => setAmPm('am')}
              width="w-pr-78"
              variant=""
              bg="none"
            />
            <Buttons
              text="오후"
              onClick={() => setAmPm('pm')}
              width="w-pr-78"
              variant=""
              bg="none"
            />
          </div>
        </div>
        <ol className="flex h-pr-152 w-full list-none flex-col gap-pr-16 overflow-y-auto rounded-xl bg-b-primary p-pr-16 text-16 text-t-default">
          {amPm === 'am'
            ? amTimeSlots.map((timeSlot) => (
                <button onClick={() => setTime(timeSlot)} className="text-left">
                  <li key={timeSlot}>{timeSlot}</li>
                </button>
              ))
            : pmTimeSlots.map((timeSlot) => (
                <button onClick={() => setTime(timeSlot)} className="text-left">
                  <li key={timeSlot}>{timeSlot}</li>
                </button>
              ))}
        </ol>
      </div>
    </>
  );
}
