import { addDays, format, subDays, getDay } from 'date-fns';

import useDateStore from '@/stores/useDateStore';

const DAYS_IN_KOREAN = ['일', '월', '화', '수', '목', '금', '토'];
const useDate = () => {
  const { date, setDate } = useDateStore();

  const dayIndex = getDay(date);
  const dayInKorean = DAYS_IN_KOREAN[dayIndex];
  const kstDate = `${format(date, 'M월 d일')} (${dayInKorean})`;

  /**
   * NOTE
   * subDays, addDays의 두번째 파라미터를 변수로 전달할 때
   * invalid Time 오류가 발생합니다.
   * 상수로 넣을 땐 문제가 없는데 원인을 모르겠습니다.
   */

  const prev = () => setDate(subDays(date, 1));
  const next = () => setDate(addDays(date, 1));
  const now = () => setDate(new Date());

  return { date: date.toDateString(), kstDate, prev, next, now, set: setDate };
};

export default useDate;
