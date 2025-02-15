import classNames from 'classnames';
import { ChangeEvent, useEffect, useRef } from 'react';

export interface TaskCommentTextareaProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const commentTextareaClass =
  "ml-pr-8 size-pr-24 shrink-0 rounded-full bg-[url('/images/icon-enter.svg')] bg-center bg-no-repeat duration-300";

/**
 * @param {string} props.value - textarea 입력 값
 * @param {Function} props.onChange - textarea 입력 값 변경 이벤트
 * @returns {JSX.Element} - 할 일 상세 댓글 입력 컴포넌트
 */
function TaskCommentTextarea({ value, onChange }: TaskCommentTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // 높이의 초기값을 디자인 기준인 24px로 설정
      textareaRef.current.style.height = '24px';
      // 댓글 입력 값 줄 수에 따라 높이 설정
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <div className="flex items-start border border-x-0 border-input py-pr-12 pt-pr-13">
      <textarea
        className="w-full resize-none bg-transparent text-14 leading-6 outline-none placeholder:text-t-default"
        placeholder="댓글을 달아주세요"
        name="content"
        value={value}
        onChange={onChange}
        ref={textareaRef}
      />
      <button
        type="submit"
        className={classNames(
          commentTextareaClass,
          value ? 'bg-brand-primary' : 'bg-t-default',
        )}
        disabled={!value}
      />
    </div>
  );
}

export default TaskCommentTextarea;
