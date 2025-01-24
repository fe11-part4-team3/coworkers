import { elapsedTime } from '@/utils/dateConversion';

/**
 * @param {string} props.createdAt - 생성일 데이터
 * @returns {JSX.Element} 생성일 변환 컴포넌트 - 방금 전, n초 전, n분 전, n시간 전, 202n.n.n(7일 후)
 *
 */
function DateDisplay({ createdAt }: { createdAt: string }) {
  return (
    <span className="text-14 text-t-secondary">{elapsedTime(createdAt)}</span>
  );
}

export default DateDisplay;
