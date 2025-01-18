import { IconTextProps } from '@/types/taskCard.type';

/**
 * @param {string | number} text - 텍스트 (날짜, 시간, 반복 일정, 댓글 수)
 * @param {'calendar' | 'time' | 'repeat' | 'commentCount'} type - 아이콘 타입
 * @param {boolean} hasBar - 해당 컴포넌트 우측 바 표시 여부
 * @returns {JSX.Element} 아이콘과 텍스트 컴포넌트 (날짜, 시간, 반복 일정, 댓글 수)
 */
function IconText({ text, type, hasBar }: IconTextProps) {
  const iconClass = {
    calendar: "before:bg-[url('/images/icon-calendar.svg')]",
    time: "before:bg-[url('/images/icon-time.svg')]",
    repeat: "before:bg-[url('/images/icon-repeat.svg')]",
    commentCount: "before:bg-[url('/images/icon-comment.svg')]",
  }[type];

  return (
    <span
      className={`relative flex items-center text-xs text-slate-500 before:inline-block before:size-pr-16 before:flex-1 before:bg-no-repeat before:content-[''] ${iconClass} ${type === 'commentCount' ? 'ml-pr-12 mr-pr-8 gap-pr-2 mo:ml-auto' : 'gap-pr-6'} ${
        hasBar
          ? 'after:absolute after:right-[-10px] after:top-1/2 after:inline-block after:h-pr-8 after:w-pr-1 after:-translate-y-1/2 after:bg-slate-700 after:content-[""]'
          : ''
      }`}
    >
      {text}
    </span>
  );
}

export default IconText;
