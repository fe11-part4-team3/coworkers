import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';

export default function DatePicker() {
  // 반드시 undefined props를 사용해야 합니다. (shadcn 에서 지정된 타입이 Date | undefined 이기 때문입니다.)
  const [date, setdate] = useState<Date | undefined>(undefined);

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setdate}
      className="flex items-center justify-center rounded-2xl bg-b-secondary p-pr-16"
    />
  );
}
