/**
 * @param {string} props.date - 날짜 데이터
 * @returns "202n년 n월 n일" 형식의 날짜
 */
export const newDate = (date: string) => {
  const newDate = new Date(date);

  return `${newDate.getFullYear()}년 ${newDate.getMonth() + 1}월 ${newDate.getDate()}일`;
};

/**
 * @param {string} props.date - 날짜 데이터
 * @returns "오전 n시 n분" 형식의 시간
 */
export const newTime = (date: string) => {
  const newDate = new Date(date);
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const Daytime = hours >= 12 ? '오후' : '오전';

  return `${Daytime} ${hours % 12 || 12}시 ${minutes.toString().padStart(2, '0')}분`;
};

/**
 * @param {string} props.date - 날짜 데이터
 * @returns "방금 전, n분 전, n시간 전, n일 전, 202n.n.n" 형식
 */
export const elapsedTime = (date: string) => {
  const start = new Date(date);
  const end = new Date();

  const seconds = Math.floor((end.getTime() - start.getTime()) / 1000);
  if (seconds < 60) return '방금 전';

  const minutes = seconds / 60;
  if (minutes < 60) return `${Math.floor(minutes)}분 전`;

  const hours = minutes / 60;
  if (hours < 24) return `${Math.floor(hours)}시간 전`;

  const days = hours / 24;
  if (days < 7) return `${Math.floor(days)}일 전`;

  return `${start.getFullYear()}.${start.getMonth() + 1}.${start.getDate()}`;
};
