import { TextareaFieldProps } from '@/types/inputField.type';

import { inputStyled } from './InputField';
import { Textarea } from '../ui/textarea';
import InputLabel from './InputLabel';

const sizes = {
  md: 'py-pr-12 px-pr-16 h-pr-75',
  lg: 'py-pr-16 px-pr-24 mo:py-pr-8 mo:px-pr-16 h-pr-104',
};

/**
 * @description TextareaField 컴포넌트
 * @param {string} props.size - textarea 크기
 * @property {'md' | 'lg'} [size='md'] - (md - 'py-pr-12 px-pr-16', lg - 'py-pr-16 px-pr-24')
 * @param {string} props.value - textarea 값
 * @param {string} props.height - textarea 높이
 * @param {string} props.label - textarea 라벨
 * @param {boolean} props.essential - 필수 여부
 * @param {string} props.placeholder - textarea placeholder
 * @param {boolean} props.disabled - textarea 비활성화 여부
 * @param {Function} props.onChange - textarea 값 변경 이벤트
 *
 */
export default function TextareaField({
  size = 'md',
  value,
  height = '',
  label = '',
  essential = false,
  placeholder = 'placeholder를 작성해주세요',
  disabled = false,
  onChange,
  ...props
}: TextareaFieldProps) {
  return (
    <fieldset>
      {label && <InputLabel label={label} essential={essential} />}
      <Textarea
        className={`${inputStyled} ${sizes[size]} ${height} resize-none transition-colors hover:border-i-hover`}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        {...props}
      />
    </fieldset>
  );
}
