import { TaskCheckboxProps } from '@/types/taskCard.type';

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
        className={`bg-md size-pr-16 shrink-0 appearance-none rounded-md border border-t-primary checked:border-none checked:bg-[url('/images/icon-checked.svg')] ${isTaskList ? 'cursor-pointer' : ''}`}
        checked={isChecked}
        onChange={handleCheckedToggle}
        disabled={!isTaskList}
      />
      <div className="grid">
        <label
          htmlFor={name}
          className={`truncate text-14m font-normal leading-4 ${isChecked ? 'line-through' : ''} ${isTaskList ? 'cursor-pointer' : ''}`}
        >
          {name}
        </label>
      </div>
    </div>
  );
}

export default TaskCheckbox;
