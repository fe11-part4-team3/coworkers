import { TaskCheckboxProps } from '@/types/taskCard.type';

/**
 * @param {string} props.name - 할 일 이름
 * @param {boolean} props.isChecked - 체크박스의 초기 체크 상태
 * @param {Function} props.handleCheckedToggle - 체크박스의 상태를 토글 함수
 * @param {boolean} props.isTaskList - 현재 컴포넌트가 "할 일 리스트" 페이지인지 여부.
 * @returns {JSX.Element} 할 일 카드 컴포넌트
 */
function TaskCheckbox({
  name,
  isChecked,
  handleCheckedToggle,
  isTaskList,
}: TaskCheckboxProps) {
  return (
    <div className="flex gap-pr-12">
      <input
        id={name}
        type="checkbox"
        className={`size-pr-16 shrink-0 appearance-none rounded-md border border-t-primary checked:border-none checked:bg-[url('/images/icon-checked.svg')] ${isTaskList && 'cursor-pointer'}`}
        checked={isChecked}
        onChange={handleCheckedToggle}
      />

      <div className="grid">
        <label
          htmlFor={name}
          className={`truncate text-14m font-normal leading-4 ${isChecked && 'line-through'} ${isTaskList && 'cursor-pointer'}`}
        >
          {name}
        </label>
      </div>
    </div>
  );
}

export default TaskCheckbox;
