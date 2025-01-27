import Link from 'next/link';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { widthStyledSliceWPr } from '@/utils/filterClass';
import { ButtonsProps } from '@/types/buttons.type';

/**
 * 버튼 컴포넌트
 * @param props.text 버튼 텍스트
 * @param props.href 버튼 링크
 * @param props.width 버튼 너비
 * @param props.size 버튼 크기
 * @param props.textColor 버튼 텍스트 색상
 * @param props.backgroundColor 버튼 배경 색상
 * @param props.icon 버튼 아이콘
 * @param props.rounded 버튼 둥근 모서리 여부
 * @param props.disabled 버튼 비활성화 여부
 * @param props.loading 버튼 로딩 여부
 * @param props.border 버튼 테두리 색상
 * @param props.onClick 버튼 클릭 이벤트
 * @param props.onSubmit 버튼 제출 이벤트
 */
export default function Buttons({
  text,
  href,
  width,
  size = 'XL',
  textColor = 'white',
  backgroundColor = 'default',
  icon = false,
  rounded = false,
  disabled = false,
  loading = false,
  border = false,
  onClick,
  onSubmit,
  ...rest
}: ButtonsProps) {
  const SIZES = {
    S: 'py-pr-6 !text-14sb',
    M: 'py-pr-12 !text-16sb',
    L: 'py-pr-14 !text-14sb',
    XL: 'py-pr-14 !text-16sb',
  };

  const BORDER = {
    default: 'border border-t-default',
    primary:
      'border border-brand-primary hover:border-i-hover active:border-i-pressed ',
    secondary: 'border border-t-secondary',
    disabled: 'border border-i-inactive',
  };

  const BACKGROUND = {
    default: 'bg-brand-primary hover:bg-i-hover active:bg-i-pressed',
    white: 'bg-white hover:bg-white active:bg-white',
    gradient: 'bg-brand-gradient',
    danger: 'bg-s-danger hover:bg-red-700 active:bg-red-800',
    none: 'bg-transparent hover:bg-transparent active:bg-transparent',
    disabled: 'bg-i-inactive',
  };

  const TEXT_COLOR = {
    default: 'text-t-default',
    white: 'text-white',
    primary: 'text-brand-primary hover:text-i-hover active:text-i-pressed',
    disabled: 'text-i-inactive',
  };

  const hasBackgroundDisabled =
    (disabled && backgroundColor === 'default' && BACKGROUND.disabled) ||
    (disabled && backgroundColor === 'white' && BACKGROUND.white) ||
    (disabled && backgroundColor === 'none' && BACKGROUND.none);

  const hasTextDisabled =
    (disabled && textColor === 'white' && TEXT_COLOR.white) ||
    (disabled && textColor === 'primary' && TEXT_COLOR.disabled);

  const hasBorderDisabled = disabled && border === 'primary' && BORDER.disabled;

  const buttonClasses = classNames(
    'flex items-center justify-center transition-all duration-200 rounded-xl w-full h-auto disabled:opacity-100 shadow-none',
    SIZES[size],
    BACKGROUND[backgroundColor],
    TEXT_COLOR[textColor],

    border && BORDER[border],
    rounded && 'rounded-full',
    width && widthStyledSliceWPr(width),

    hasBackgroundDisabled,
    hasTextDisabled,
    hasBorderDisabled,
  );

  // 렌더링할 콘텐츠 정의
  const renderContent = () => (
    <>
      {icon && typeof icon && (
        <span className="flex size-pr-16 items-center justify-center">
          {icon}
        </span>
      )}
      {loading && <Loader2 className="animate-spin" />}
      {text}
    </>
  );

  if (href) {
    return (
      <Button className={buttonClasses} disabled={disabled} {...rest}>
        <Link href={href!}>{renderContent()}</Link>
      </Button>
    );
  }

  return (
    <Button
      className={buttonClasses}
      onClick={onClick}
      onSubmit={onSubmit}
      disabled={disabled}
      {...rest}
    >
      {renderContent()}
    </Button>
  );
}
