import DropDown from '@/components/DropDown';

/**
 * @param {number} props.taskId - 할 일 id
 * @returns {JSX.Element} 할 일 카드 DropDown 컴포넌트
 */
function DropdownButton({ taskId }: { taskId: number }) {
  return (
    <div className="ml-auto size-pr-16 mo:ml-0">
      <DropDown
        trigger={<button className="icon-kebab" />}
        items={[
          {
            text: '수정하기',
            onClick: () => alert(`${taskId} 할 일 카드 수정하기`),
          },
          {
            text: '삭제하기',
            onClick: () => alert(`${taskId} 할 일 카드 삭제하기`),
          },
        ]}
        width="w-pr-120"
      />
    </div>
  );
}

export default DropdownButton;
