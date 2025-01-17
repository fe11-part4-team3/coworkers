interface TaskCheckboxProps {
  name: string;
  isChecked: boolean;
  toggleChecked: () => void;
}

function TaskCheckbox({
  name,
  isChecked,
  toggleChecked,
}: TaskCheckboxProps) {
  return (
    <div className="flex gap-pr-12">
      <input
        id={name}
        type="checkbox"
        className="bg-md h-pr-16 w-pr-16 flex-shrink-0 cursor-pointer appearance-none rounded-md border border-solid border-[--t-primary-dark] checked:border-none checked:bg-[url('/images/icon_checked.svg')]"
        checked={isChecked}
        onChange={toggleChecked}
      />
      <div className="grid gap-1.5">
        <label
          htmlFor={name}
          className={`cursor-pointer truncate text-sm font-normal leading-4 ${isChecked ? 'line-through' : ''} `}
        >
          {name}
        </label>
      </div>
    </div>
  );
}

export default TaskCheckbox;
