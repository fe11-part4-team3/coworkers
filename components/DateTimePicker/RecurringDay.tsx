import { useEffect, useState } from 'react';

interface RecurringDayProps {
  onDaySelect: (selectedDays: number[]) => void;
}

/**
 * 반복 요일 선택 컴포넌트
 * @param {function} onDaySelect - 요일 선택 시 실행되는 함수
 */
function RecurringDay({ onDaySelect }: RecurringDayProps) {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleWeekdaysClick = (index: number) => {
    setSelectedDays((prev) => {
      if (prev.includes(index)) {
        // 이미 선택된 요일이면 선택 해제
        return prev.filter((day) => day !== index);
      } else {
        // 선택되지 않은 요일이면 선택
        return [...prev, index];
      }
    });
  };

  // selectedDays가 변경될 때마다 부모 컴포넌트로 전달
  useEffect(() => {
    onDaySelect(selectedDays);
  }, [selectedDays]);

  return (
    <div className="flex gap-pr-4">
      {weekdays.map((day, index) => (
        <button
          key={index}
          className={`h-pr-44 w-full rounded-xl text-14m ${
            selectedDays.includes(index)
              ? 'bg-brand-primary text-t-primary'
              : 'bg-b-secondary-2 text-t-default'
          }`}
          type="button"
          onClick={() => handleWeekdaysClick(index)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

export default RecurringDay;
