import { TaskCheckboxProps } from '@/types/taskCard.type';

function TaskCheckbox({
  name,
  isChecked,
  handleCheckedToggle,
}: TaskCheckboxProps) {
  return (
    <div className="flex gap-pr-12">
      <input
        id={name}
        type="checkbox"
        className="bg-md size-pr-16 shrink-0 cursor-pointer appearance-none rounded-md border border-t-primary checked:border-none checked:bg-[url('/images/icon-checked.svg')]"
        checked={isChecked}
        onChange={handleCheckedToggle}
      />
      <div className="grid">
        <label
          htmlFor={name}
          className={`cursor-pointer truncate text-14m font-normal leading-4 ${isChecked ? 'line-through' : ''} `}
        >
          {name}
        </label>
      </div>
    </div>
  );
}

export default TaskCheckbox;
