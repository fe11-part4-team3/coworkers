import classNames from 'classnames';

import { elapsedTime } from '@/utils/dateConversion';

/**
 * @param {string} props.createdAt - 생성일 데이터
 * @returns {JSX.Element} 생성일 변환 컴포넌트 - 방금 전, n초 전, n분 전, n시간 전, 202n.n.n(7일 후)
 */
function DateDisplay({
  createdAt,
  className = 'text-t-secondary',
}: {
  createdAt: string;
  className?: string;
}) {
  return (
    <span className={classNames(className, 'text-14')}>
      {elapsedTime(createdAt)}
    </span>
  );
}

export default DateDisplay;
