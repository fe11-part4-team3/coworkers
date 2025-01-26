'use client';

import Image from 'next/image';

interface GroupHeaderProps {
  name: string;
  // onClick: () => void;
}

//TODO 썸네일 이미지 추가
//TODO 헤더 배경 반응형 색상으로 수정
//TODO 드롭 다운 컴포넌트 삽입
export default function GroupHeader({
  name,
  // onClick,
}: GroupHeaderProps) {
  return (
    <header className="flex max-h-pr-64 max-w-pr-1200 items-center justify-between rounded-pr-12 border border-[#F8FAFC1A] bg-[--t-primary-dark-10] px-pr-20">
      <h2 className="text-20b text-primary">{name}</h2>
      <div className="flex gap-pr-20">
        <Image
          src="/images/img-thumbnail-team.png"
          alt=""
          width={181}
          height={64}
        />
        <button onClick={() => {}}>
          <Image
            src="/images/icon-gear.svg"
            alt="팀 편집"
            width={24}
            height={24}
          />
        </button>
      </div>
    </header>
  );
}
