import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ICON_ARROW_FILLEND from '@/public/images/icon-arrow-filled.svg';
import { SelectBoxProps } from '@/types/selectBox.type';
import { widthStyledSliceWPr } from '@/utils/filterClass';
/**
 * @description SelectBox 컴포넌트
 * @param {string[]} props.options - 선택 옵션 리스트
 * @param {string} props.bgType - SelectBox 배경색 타입
 * @param {string} props.defaultValue - 기본 선택 옵션
 * @param {string} props.placeholder - 선택 옵션 placeholder
 * @param {string} props.width - SelectBox 너비
 * @param {Function} props.onValueChange - 선택 옵션 변경 이벤트
 * @example
 * <SelectBox
 *  options={[
 *    { label: '옵션1', value: 'OPTION1' },
 *    { label: '옵션2', value: 'OPTION2' },
 *    { label: '옵션3', value: 'OPTION3' },
 *  ]}
 *  placeholder="옵션을 선택하세요"
 *  onValueChange={(value) => console.log('선택된 옵션:', value)}
 * />
 */
export default function SelectBox({
  options,
  bgType = 'default',
  placeholder,
  defaultValue,
  width,
  onValueChange,
}: SelectBoxProps) {
  // SelectBox 배경색 스타일
  const bgStyled = {
    default: 'bg-b-secondary data-[state=open]:bg-b-tertiary',
    modal: 'bg-b-secondary-2 data-[state=open]:bg-b-secondary-2',
  };

  return (
    <div>
      <Select defaultValue={defaultValue} onValueChange={onValueChange}>
        <SelectTrigger
          className={`font-14 mo:font-12 focus:ring-none w-full rounded-xl border-none px-pr-14 py-pr-10 text-t-primary hover:bg-b-tertiary focus:bg-b-tertiary focus:outline-none data-[placeholder='']:text-t-default mo:rounded-lg mo:p-pr-8 ${width && widthStyledSliceWPr(width)} ${bgStyled[bgType]}`}
        >
          <SelectValue placeholder={placeholder} />
          <ICON_ARROW_FILLEND width={24} height={24} />
        </SelectTrigger>
        <SelectContent
          className={`mt-pr-8 h-full w-auto min-w-pr-90 overflow-hidden rounded-xl border border-b-tertiary bg-b-secondary text-center text-16 text-t-default mo:text-14 ${width && widthStyledSliceWPr(width)}`}
        >
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="dropdown-item rounded-0 px-pr-14 py-pr-11 text-t-primary mo:px-pr-8"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
