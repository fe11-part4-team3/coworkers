import Image from 'next/image';
import classNames from 'classnames';

import { useSnackBarVisibility } from './SnackBar.hook';
import { ISnackBarProps } from './SnackBar.type';

// STUB 스낵바 상태 스타일
const SNACKBAR_STATE_STYLED = {
  error: {
    backgroundColor: 'bg-red-700 shadow-red-700/20 text-white',
    icon: '/images/icon-danger.svg',
  },
  success: {
    backgroundColor: 'bg-brand-primary shadow-green-500/20 text-white',
    icon: '/images/icon-state-done-white.svg',
  },
};

/**
 * SnackBar 스타일 컴포넌트
 * @param severity - 상태에 따른 스타일을 적용하기 위한 props
 * @param children - Snackbar에 표시할 메시지
 * @param open - Snackbar가 열려있는지 여부
 * @param onClose - Snackbar를 닫기 위한 함수
 * @param autoHideDuration - 자동으로 닫히는 시간 (밀리초) 기본값은 2500
 */
function SnackBar({
  severity,
  children,
  open,
  onClose,
  autoHideDuration = 2500,
}: ISnackBarProps) {
  const visible = useSnackBarVisibility(open, autoHideDuration, onClose);

  if (!open && !visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      className={classNames(
        'fixed left-1/2 top-pr-120 z-50 mx-auto -translate-x-1/2 transform mo:w-5/6',
        'flex items-center gap-pr-10 px-pr-12 py-pr-10 mo:w-5/6 mo:px-pr-10 mo:py-pr-8',
        'rounded-xl text-14m shadow-xl mo:text-12m',
        'opacity-0 transition-opacity duration-300',

        SNACKBAR_STATE_STYLED[severity || 'success'].backgroundColor,

        visible ? 'opacity-100' : 'opacity-0',
        open || visible ? 'flex' : 'hidden',
      )}
    >
      <Image
        width={20}
        height={20}
        alt={severity || 'success'}
        src={SNACKBAR_STATE_STYLED[severity || 'success'].icon}
      />

      <p className="whitespace-pre-line">{children}</p>
    </div>
  );
}

export default SnackBar;
