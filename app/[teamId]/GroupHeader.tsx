'use client';

import Image from 'next/image';

interface GroupHeaderProps {
  name: string;
  // onClick: () => void;
}

/**
 * @todo
 * ```
 * 시간에 나온 border 값이 커스텀 테마에 없어
 * 일단 하드하게 삽입했습니다.
 * 추후 커스텀 테마 값이 추가 될 경우 수정하겠습니다.
 *
 * border-primary가 존재하긴 하나
 * opacity를 적용할 수 없는 컬러 값이라
 * 시안과 동일하게 디자인 할 수 없었습니다.
 * ```
 */
export default function GroupHeader({
  name,
  // onClick,
}: GroupHeaderProps) {
  return (
    <header className="flex max-h-pr-64 max-w-pr-1200 items-center justify-between rounded-pr-12 border border-[#F8FAFC1A] bg-slate-50 bg-opacity-10 px-pr-20">
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
