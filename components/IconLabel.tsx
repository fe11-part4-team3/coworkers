import classNames from 'classnames';

import { IconTextProps } from '@/types/taskCard.type';

/**
 * @param {string | number} props.text - 텍스트 (날짜, 시간, 반복 일정, 댓글 수)
 * @param {'calendar' | 'time' | 'repeat' | 'commentCount'} props.type - 아이콘 타입
 * @param {'S' | 'M'} props.fontSize - 텍스트 사이즈 설정
 * @param {string} props.fontColor - 텍스트 컬러 설정
 * @param {boolean} props.hasBar - 해당 컴포넌트 우측 바 표시 여부
 * @returns {JSX.Element} 아이콘과 텍스트 컴포넌트 (날짜, 시간, 반복 일정, 댓글 수)
 */
function IconText({
  text,
  type,
  fontSize = 'S',
  fontColor,
  hasBar,
}: IconTextProps) {
  const iconClass = {
    calendar: "before:bg-[url('/images/icon-calendar.svg')]",
    time: "before:bg-[url('/images/icon-time.svg')]",
    repeat: "before:bg-[url('/images/icon-repeat.svg')]",
    commentCount: "before:bg-[url('/images/icon-comment.svg')]",
  }[type];

  const baseClass =
    "relative flex items-center leading-none before:inline-block before:size-pr-16 before:flex-1 before:bg-no-repeat before:content-['']";
  const textSizeClass = fontSize === 'S' ? 'text-12' : 'text-14';
  const fontColorClass = fontColor || 'text-slate-500';
  const commentCountClass = type === 'commentCount' ? 'gap-pr-4' : 'gap-pr-6';

  return (
    <>
      <span
        className={classNames(
          ...baseClass,
          iconClass,
          textSizeClass,
          fontColorClass,
          commentCountClass,
        )}
      >
        {text}
      </span>
      {hasBar && <span className="mx-pr-10 h-pr-8 w-pr-1 bg-b-tertiary" />}
    </>
  );
}

export default IconText;
