import { IconTextProps } from '@/types/taskCard.type';

/**
 * @param param.text string | number
 * @param param.type calendar | time | repeat | commentCount
 * @param param.hasBar true
 * @returns 아이콘과 텍스트 컴포넌트 (날짜, 시간, 반복 일정, 댓글 수)
 */
const IconText = ({
  text,
  type,
  hasBar,
}: IconTextProps) => {
  const iconClass = {
    calendar:
      "before:bg-[url('/images/icon_calendar.svg')]",
    time: "before:bg-[url('/images/icon_time.svg')]",
    repeat: "before:bg-[url('/images/icon_repeat.svg')]",
    commentCount:
      "before:bg-[url('/images/icon_comment.svg')]",
  }[type];

  return (
    <span
      className={`relative flex items-center text-xs text-slate-500 before:inline-block before:h-pr-16 before:w-pr-16 before:flex-1 before:bg-no-repeat before:content-[''] ${iconClass} ${type === 'commentCount' ? 'ml-pr-12 mr-pr-8 gap-pr-2 mo:ml-auto' : 'gap-pr-6'} ${
        hasBar
          ? 'after:absolute after:right-[-10px] after:top-1/2 after:inline-block after:h-pr-8 after:w-pr-1 after:translate-y-[-50%] after:bg-slate-700 after:content-[""]'
          : ''
      }`}
    >
      {text}
    </span>
  );
};

export default IconText;
