import ICON_VISIBILITY_ON from '@/public/images/icon-visibility_on.svg';
import ICON_VISIBILITY_OFF from '@/public/images/icon-visibility_off.svg';

interface HideToggleProps {
  togglePassword: () => void;
  showPassword: boolean;
}

/**
 * @description 비밀번호 보이기/숨기기 버튼
 * @param {Function} props.togglePassword - 비밀번호 보이기/숨기기 토글 함수
 * @param {boolean} props.showPassword - 비밀번호 보이기 여부
 */
export default function HideToggle({
  togglePassword,
  showPassword,
}: HideToggleProps) {
  return (
    <button
      type="button"
      onClick={togglePassword}
      className="absolute right-pr-16 top-pr-15.5"
      aria-label="Toggle Password Visibility"
    >
      {showPassword ? (
        <ICON_VISIBILITY_ON width={24} height={24} alt="Show Password" />
      ) : (
        <ICON_VISIBILITY_OFF width={24} height={24} alt="Hide Password" />
      )}
    </button>
  );
}
