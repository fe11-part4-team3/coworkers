'use client';

import Image from 'next/image';

interface GroupHeaderProps {
  name: string;
  // onClick: () => void;
}

/**
 * @todo
 * ```
 * 헤더의 border 컬러는  `border-primary` 에 `border-opacity-10`입니다. 하지만 `border-primary`는 `hsl`으로 `opacity`를 적용할 수 없는 컬러 값 입니다. 
 
그래서 일단 시안과 디자인을 맞추기 위해 `border-[#F8FAFC1A]`를 하드하게 입력했습니다.

차후 커스텀 테마가 추가된다면 수정 하겠습니다.
 * ```
 */
export default function GroupHeader({
  name,
  // onClick,
}: GroupHeaderProps) {
  return (
    <header className="flex max-h-pr-64 max-w-pr-1200 items-center justify-between rounded-pr-12 border border-[#F8FAFC1A] bg-slate-50/10 px-pr-20">
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
