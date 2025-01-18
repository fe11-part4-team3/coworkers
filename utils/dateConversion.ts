/**
 * @param param.date string
 * @returns "202n년 n월 n일" 형식의 날짜
 */
export const newDate = (date: string) => {
  const newDate = new Date(date);

  return `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};

/**
 * @param param.date string
 * @returns "오전 n시 n분" 형식의 시간
 */
export const newTime = (date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const Daytime = hours >= 12 ? '오후' : '오전';

  return `${Daytime} ${hours % 12 || 12}시 ${minutes.toString().padStart(2, '0')}분`;
};
