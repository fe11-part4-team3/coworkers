import { useState } from 'react';

import ICON_HEART from '@/public/images/icon-heart.svg';

/**
 * @param {'readOnly' | 'interactive'} type - 컴포넌트 타입
 *  readOnly : 좋아요 수 확인만 가능, 클릭 시 아무 동작 없음
 *  interactive : 클릭 시 좋아요 수 카운트되며 하트 버튼 토글
 * @param {number} likeCount - 초기 좋아요 수
 * @returns {JSX.Element} 좋아요 수와 좋아요 버튼을 렌더링하는 컴포넌트
 */
function LikeCount({
  type,
  likeCount,
}: {
  type: 'readOnly' | 'interactive';
  likeCount: number;
}) {
  const [isCheck, setIsCheck] = useState(false);
  const [currentCount, setCurrentCount] = useState(likeCount);

  const handleClick = () => {
    setIsCheck(!isCheck);
    setCurrentCount(isCheck ? currentCount - 1 : currentCount + 1);
  };

  return (
    <>
      <button
        className="flex items-center justify-center text-14 text-t-disabled mo:text-12"
        onClick={handleClick}
        disabled={type === 'readOnly'}
      >
        <ICON_HEART
          fill={!isCheck ? 'none' : 'var(--s-danger)'}
          stroke={!isCheck ? 'var(--icon-primary)' : 'none'}
        />
        <span className="ml-pr-5">
          {currentCount >= 9999 ? '9999+' : currentCount}
        </span>
      </button>
    </>
  );
}

export default LikeCount;
