import DropDown from '@/components/DropDown';
import { Ref } from 'react';

interface KebabDropDownBaseProps {
  ref?: Ref<HTMLDivElement>;
  onEdit?: () => void;
  onDelete?: () => void;
}

// onEdit과 onDelete 중 하나 이상은 전달해야합니다.
type KebabDropDownProps =
  | (KebabDropDownBaseProps & { onEdit: () => void; onDelete?: () => void })
  | (KebabDropDownBaseProps & { onEdit?: () => void; onDelete: () => void });

type ItemType = { text: string; onClick: () => void };

/**
 * ### 케밥 메뉴 드롭다운 컴포넌트
 * @param {Ref} props.ref 드롭다운 ref
 * @param {Function} props.onEdit - 수정 함수
 * @param {Function} props.onDelete - 삭제 함수
 * @returns {JSX.Element} 케밥 케이스 드롭다운 컴포넌트
 */
function KebabDropDown({ ref, onEdit, onDelete }: KebabDropDownProps) {
  const items: ItemType[] = [
    onEdit && { text: '수정하기', onClick: onEdit },
    onDelete && { text: '삭제하기', onClick: onDelete },
  ].filter(Boolean) as ItemType[];

  return (
    <div className="size-pr-16">
      <DropDown
        ref={ref}
        trigger={<button className="icon-kebab absolute" />}
        items={items}
        width="w-pr-120"
      />
    </div>
  );
}

export default KebabDropDown;
