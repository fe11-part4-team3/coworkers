import Image from 'next/image';
import React from 'react';

interface CloseButtonProps {
  onClick: () => void;
}

export default function CloseButton({ onClick }: CloseButtonProps) {
  return (
    <button
      className="absolute right-pr-25 top-pr-16 text-gray-500"
      onClick={onClick}
    >
      <Image
        width={20}
        height={20}
        src="/images/icon-close.svg"
        alt="닫기 버튼"
      />
    </button>
  );
}
