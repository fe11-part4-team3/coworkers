import Link from 'next/link';
import classNames from 'classnames';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { widthStyledSliceWPr } from '@/utils/filterClass';
import { ButtonsProps } from '@/types/buttons.type';

// 버튼 상태에 따른 클래스명 정의
const BUTTON_STATE: Record<string, string> = {
  outline:
    'border border-brand-primary hover:text-i-hover focus:text-i-pressed active:text-i-pressed hover:border-i-hover focus:border-i-pressed active:border-i-pressed',
  secondary: 'border border-t-secondary text-t-default',
  destructive: 'bg-s-danger text-white',
  '': '',
};

// 버튼 배경에 따른 클래스명 정의
const BUTTON_BG: Record<string, string> = {
  default:
    'bg-brand-primary text-white hover:bg-i-hover focus:bg-i-pressed active:bg-i-pressed',
  white: 'bg-white hover:bg-white focus:bg-white active:bg-white',
  gradient: 'bg-brand-gradient text-white',
  none: 'bg-transparent',
};

// 버튼 크기에 따른 클래스명 정의
const BUTTON_SIZES: Record<string, string> = {
  S: 'py-pr-6 !text-14sb',
  M: 'py-pr-12 !text-16sb',
  L: 'py-pr-14 !text-14sb',
  XL: 'py-pr-14 !text-16sb',
};

// 비활성화 상태에 따른 클래스명 정의
const DISABLED_CLASSES = (
  bg: string,
  variant: string,
  isDisabled: boolean,
): string => {
  if (!isDisabled) return '';

  if (bg === 'default' && variant !== 'outline') {
    return 'bg-i-inactive text-t-inverse';
  }

  if (bg === 'white' && variant === 'outline') {
    return 'text-i-inactive border-i-inactive';
  }

  if (bg === 'none' && variant === 'outline') {
    return 'bg-transparent text-i-inactive border-i-inactive';
  }

  return '';
};

/**
 * 버튼 컴포넌트
 * @param {string} props.text 버튼 텍스트
 * @param {string} props.variant 버튼 스타일 (outline, secondary, destructive)
 * @param {string} props.href 버튼 링크
 * @param {React.ReactNode} props.icon 버튼 아이콘(svgr 컴포넌트)
 * @param {boolean} props.rounded 버튼 둥근 모서리 여부
 * @param {string} props.size 버튼 크기 (S, M, L, XL)
 * @param {boolean} props.disabled 버튼 비활성화 여부
 * @param {function} props.onClick 버튼 클릭 이벤트
 * @param {string} props.bg 버튼 배경 색상 (white, gradient, none, default)
 * @param {boolean} props.loading 로딩 중 여부
 * @param {string} props.width 버튼 너비
 * @param {string} props.type 버튼 타입 (button, submit)
 * bg: 'none' 일때는, disabled를 사용할 수 없습니다.
 */
export default function Buttons(props: ButtonsProps) {
  const {
    text,
    variant = '',
    href,
    icon = false,
    rounded = false,
    size = 'M',
    disabled = false,
    onClick,
    bg = 'default',
    width = '',
    type = 'button',
  } = props;

  // loading이 true이면 disabled을 true로 설정
  const isDisabled = disabled;

  // 렌더링할 콘텐츠 정의
  const renderContent = () => (
    <>
      {icon && typeof icon && (
        <span className="flex size-pr-16 items-center justify-center">
          {icon}
        </span>
      )}
      {disabled && <Loader2 className="animate-spin" />}
      {text}
    </>
  );

  // 조건부 클래스명 정의
  const buttonClasses = classNames(
    BUTTON_BG[bg],
    BUTTON_STATE[variant],
    BUTTON_SIZES[size],
    {
      // bg가 'default' 또는 'gradient'일 때 텍스트 색상을 'text-white'로 설정
      'text-white': bg === 'default' || bg === 'gradient',

      // bg가 'none'이거나 variant가 'outline'이고 bg가 'white'일 때 텍스트 색상 'text-brand-primary'로 설정
      'text-brand-primary':
        (bg === 'none' || (variant === 'outline' && bg === 'white')) &&
        !isDisabled,

      // variant가 'secondary'이고 bg가 'white'일 때 텍스트 색상
      'text-t-default':
        variant === 'secondary' && bg === 'white' && !isDisabled,
    },
    width ? widthStyledSliceWPr(width) : 'w-full',
    rounded ? 'rounded-full' : 'rounded-xl',
    {
      // 비활성화 클래스 적용
      [DISABLED_CLASSES(bg, variant, isDisabled)]: isDisabled,

      // variant가 'destructive'이고 bg가 'default'일 때 hover 컬러 고정
      'hover:bg-red-700 focus:bg-red-800 active:bg-red-800':
        variant === 'destructive' && bg === 'default',

      // bg가 'none'일 때 hover 텍스트 및 배경 색상 변경
      'hover:text-i-hover hover:bg-transparent focus:text-i-pressed focus:bg-transparent active:text-i-pressed active:bg-transparent':
        bg === 'none' && !isDisabled,

      // variant가 'outline'이고 bg가 'none'일 때 hover 텍스트 색상 변경
      'hover:text-i-hover focus:text-i-pressed active:text-i-pressed':
        variant === 'outline' && bg === 'none' && !isDisabled,

      // variant: 'secondary' && bg: 'white'일 때 hover:bg-slate-200 추가
      'hover:bg-slate-200 focus:bg-slate-300 active:bg-slate-300':
        variant === 'secondary' && bg === 'white' && !isDisabled,
    },
    'h-auto shadow-none',
  );

  if ('href' in props) {
    return (
      <Button className={buttonClasses} disabled={isDisabled} type="button">
        <Link href={href!}>{renderContent()}</Link>
      </Button>
    );
  }

  return (
    <Button
      className={buttonClasses}
      onClick={onClick}
      disabled={isDisabled}
      type={type}
    >
      {renderContent()}
    </Button>
  );
}
