import DropDown from '@/components/DropDown';

/**
 * @param {Function} props.onEdit - 수정 함수
 * @param {Function} props.onDelete - 삭제 함수
 * @returns {JSX.Element} 케밥 케이스 드롭다운 컴포넌트
 */
function KebabDropDown({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="size-pr-16">
      <DropDown
        trigger={<button className="icon-kebab absolute" />}
        items={[
          { text: '수정하기', onClick: onEdit },
          { text: '삭제하기', onClick: onDelete },
        ]}
        width="w-pr-120"
      />
    </div>
  );
}

export default KebabDropDown;
