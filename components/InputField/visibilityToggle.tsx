import Image from 'next/image';

interface VisibilityToggleProps {
  togglePassword: () => void;
  showPassword: boolean;
}

/**
 * @description 비밀번호 보이기/숨기기 버튼
 * @param {Function} props.togglePassword - 비밀번호 보이기/숨기기 토글 함수
 * @param {boolean} props.showPassword - 비밀번호 보이기 여부
 */
export default function VisibilityToggle({
  togglePassword,
  showPassword,
}: VisibilityToggleProps) {
  return (
    <button
      type="button"
      onClick={togglePassword}
      className="absolute right-pr-16 top-1/2 -translate-y-1/2"
    >
      <Image
        src={
          showPassword
            ? 'images/icon-visibility_on.svg'
            : 'images/icon-visibility_off.svg'
        }
        alt="visibility_off"
        width={24}
        height={24}
      />
    </button>
  );
}
