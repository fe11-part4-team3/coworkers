import { useState } from 'react';

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
        className="text-14 text-t-disabled mo:text-12"
        onClick={handleClick}
        disabled={type === 'readOnly'}
      >
        {!isCheck ? '♡' : '♥︎'}
        <span className="ml-pr-4">
          {currentCount >= 9999 ? '9999+' : currentCount}
        </span>
      </button>
    </>
  );
}

export default LikeCount;
