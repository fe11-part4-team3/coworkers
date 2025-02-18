import { MouseEvent } from 'react';
import classNames from 'classnames';

import { TaskCheckboxProps } from '@/types/taskCard.type';
import { useSnackbar } from '@/contexts/SnackBar.context';

const checkboxClass =
  "size-pr-16 shrink-0 appearance-none rounded-md border border-t-primary checked:border-none checked:bg-[url('/images/icon-checked.svg')]";

/**
 * @param {string} props.name - 할 일 이름
 * @param {boolean} props.isChecked - 체크박스의 초기 체크 상태
 * @param {Function} props.handleCheckedToggle - 체크박스의 상태를 토글 함수
 * @param {boolean} props.isTaskList - 현재 컴포넌트가 "할 일 리스트" 페이지인지 여부.
 * @returns {JSX.Element} 할 일 카드 컴포넌트
 */
function TaskCheckbox({
  ref,
  name,
  isChecked,
  handleCheckedToggle,
  isTaskList,
}: TaskCheckboxProps) {
  const { showSnackbar } = useSnackbar();

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    if (!isTaskList) {
      e.preventDefault();
      showSnackbar('할 일 리스트 페이지에서만 수정이 가능합니다.', 'error');
    }
  };

  return (
    <div className="flex gap-pr-12" onClick={handleClick}>
      <input
        ref={ref}
        id={name}
        type="checkbox"
        className={classNames(checkboxClass, isTaskList && 'cursor-pointer')}
        checked={isChecked}
        onChange={handleCheckedToggle}
      />

      <div className="grid">
        <label
          htmlFor={name}
          className={classNames(
            isChecked && 'line-through',
            isTaskList && 'cursor-pointer',
            'truncate text-14m font-normal leading-4',
          )}
        >
          {name}
        </label>
      </div>
    </div>
  );
}

export default TaskCheckbox;
