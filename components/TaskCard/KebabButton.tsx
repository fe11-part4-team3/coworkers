import DropDown from '../DropDown';

function KebabButton({ taskId }: { taskId: number }) {
  return (
    <div className="ml-auto size-pr-16 mo:ml-0">
      <DropDown
        trigger={
          <button className="size-pr-16 shrink-0 bg-[url('/images/icon-kebab.svg')] text-xs" />
        }
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

export default KebabButton;
