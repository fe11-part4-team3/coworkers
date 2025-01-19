import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ICON_ARROW_FILLEND from '@/public/images/icon-arrow-filled.svg';

interface SelectBoxProps {
  options: string[];
  defaultValue?: string;
  placeholder?: string;
  width?: string;
  onValueChange?: (value: string) => void;
}

/**
 * @description SelectBox 컴포넌트
 * @param {string[]} props.options - 선택 옵션 리스트
 * @param {string} props.defaultValue - 기본 선택 옵션
 * @param {string} props.placeholder - 선택 옵션 placeholder
 * @param {string} props.width - SelectBox 너비
 * @param {Function} props.onValueChange - 선택 옵션 변경 이벤트
 * @example
 * <SelectBox
 *  options={['옵션1', '옵션2', '옵션3']}
 *  placeholder="옵션을 선택하세요"
 *  onValueChange={(value) => console.log('선택된 옵션:', value)}
 *  />
 */
export default function SelectBox({
  options,
  placeholder,
  defaultValue,
  width,
  onValueChange,
}: SelectBoxProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={onValueChange}>
      <SelectTrigger
        className={`font-14 mo:font-12 focus:ring-none size-full rounded-xl border-none bg-b-secondary px-pr-14 py-pr-10 text-t-primary hover:bg-b-tertiary focus:bg-b-tertiary focus:outline-none data-[state=open]:bg-b-tertiary data-[placeholder='']:text-t-default mo:rounded-lg mo:p-pr-8 ${width}`}
      >
        <SelectValue placeholder={placeholder} />
        <ICON_ARROW_FILLEND width={24} height={24} />
      </SelectTrigger>
      <SelectContent
        className={`mt-pr-8 w-auto min-w-pr-90 overflow-hidden rounded-xl border border-b-tertiary bg-b-secondary text-center text-16 text-t-default mo:text-14 ${width}`}
      >
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="dropdown-item rounded-0 w-full px-pr-14 py-pr-11 text-t-primary mo:px-pr-8"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
