'use client';

import Image from 'next/image';

import IconGear from '@/public/images/icon-gear.svg';
import DropDown from '@/components/DropDown';

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
      <div className="flex items-center gap-pr-20">
        <Image
          src="/images/img-thumbnail-team.png"
          alt=""
          width={181}
          height={64}
        />
        <DropDown
          trigger={
            <IconGear className="transition-all hover:rotate-90 hover:scale-110 focus:rotate-90 data-[state=open]:rotate-90 data-[state=open]:scale-110" />
          }
          items={[
            { text: '수정하기', onClick: () => {} },
            { text: '삭제하기', onClick: () => {} },
          ]}
        />
      </div>
    </header>
  );
}
