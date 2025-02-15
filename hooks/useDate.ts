import useDateStore from '@/stores/useDateStore';
import { addDays, format, subDays } from 'date-fns';
import dayjs from 'dayjs';

const useDate = () => {
  const { date, setDate } = useDateStore();
  dayjs.locale('ko');

  const kstDate = format(date, 'M월 d일 (E)');

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
