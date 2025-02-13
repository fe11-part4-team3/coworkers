import { useState } from 'react';

import { InputFieldProps } from '@/types/inputField.type';
import useModalStore from '@/stores/modalStore';
import { Input } from '@/components/ui/input';
import Buttons from '@/components/Buttons';
import ChangePassword from '@/components/modal/ChangePassword';
import useFadeMessage from '@/hooks/useFadeComponents';

import InputLabel from './InputLabel';
import HideToggle from './HideToggle';
import ErrorMessage from './ErrorMessage';

// input 공통 스타일
export const inputStyled =
  'focuse:border-i-focus disabled:border-b-disabled visited:border-i-focus target:border-i-focus focus:border-i-focus active:border-i-focus rounded-xl w-full border bg-b-secondary text-t-default disabled:bg-b-tertiary disabled:text-t-disabled text-16 mo:text-14 h-auto shadow-none';

/**
 * @description InputField 컴포넌트
 * @param {string} props.type - input 타입
 * @param {string} props.value - input 값
 * @param {string} props.label - input 라벨
 * @param {boolean} props.essential - 필수 여부
 * @param {string} props.placeholder - input placeholder
 * @param {string} props.errorMessage - input 에러 메시지
 * @param {boolean} props.disabled - input 비활성화 여부
 * @param {string} props.width - input 너비
 * @param {Function} props.onChange - input 값 변경 이벤트
 * @param {Function} props.onClickButton - input 내부 버튼 클릭 이벤트(password 타입일 때만 사용)
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props.props - input 속성
 */
export default function InputField({
  value,
  type = 'text',
  label = '',
  essential = false,
  placeholder = 'placeholder를 작성해주세요',
  errorMessage,
  disabled = false,
  width = '',
  onChange,
  onBlur,
  sesstionStatus,
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const { openModal } = useModalStore();

  // --- fadeOut 처리를 위한 상태 ---
  const { fadingMessage, animationClass } = useFadeMessage(errorMessage);

  const errorMessageState = (errorMessage: string) => {
    if (
      errorMessage === '이메일은 필수 입력입니다.' ||
      errorMessage === '비밀번호는 필수 입력입니다.' ||
      errorMessage === '닉네임은 필수 입력입니다.' ||
      errorMessage === '팀 이름은 필수 입력입니다.'
    ) {
      return 'ERROR';
    } else {
      return 'WARNING';
    }
  };

  // 비밀번호 보이기/숨기기 토글
  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // STUB 비밀번호 변경 모달 열기
  const handleOpenResetPassword = () => {
    openModal(<ChangePassword />);
  };

  return (
    <fieldset className={width ? width : 'w-full'}>
      {label && <InputLabel label={label} essential={essential} />}
      <div className="relative">
        <Input
          id={label}
          type={
            type === 'password' ? (showPassword ? 'text' : 'password') : type
          }
          value={value ?? ''}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          className={`px-pr-16 py-pr-14.5 mo:py-pr-13.5 ${errorMessage && 'border-s-danger'} ${!disabled && !errorMessage && 'hover:border-i-hover'} ${inputStyled}`}
          {...props}
        />
        {type === 'password' &&
          (disabled ? (
            sesstionStatus !== 'authenticated' && (
              <div className="absolute right-pr-16 top-1/2 -translate-y-1/2">
                <Buttons
                  text="변경하기"
                  size="S"
                  className="w-pr-74"
                  onClick={handleOpenResetPassword}
                />
              </div>
            )
          ) : (
            <HideToggle
              togglePassword={togglePassword}
              showPassword={showPassword}
            />
          ))}
        {fadingMessage && (
          <ErrorMessage
            tooltipState={errorMessageState(fadingMessage)}
            className={animationClass}
          >
            {fadingMessage}
          </ErrorMessage>
        )}
      </div>
    </fieldset>
  );
}
