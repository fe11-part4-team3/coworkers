/**
 * ModalButton 컴포넌트는 모달 창에서 사용할 수 있는 버튼을 렌더링합니다.
 * 버튼의 텍스트, 클릭 이벤트, 색상 스타일을 조정할 수 있습니다.
 *
 * @param {string} text - 버튼에 표시될 텍스트
 * @param {Function} onClick - 버튼 클릭 시 호출되는 함수
 * @param {'primary' | 'primaryReverse' | 'danger' | 'dangerReverse'} color - 버튼의 색상 스타일
 *   - 'primary': 기본 스타일 (배경색: 브랜드 색상, 텍스트: 흰색)
 *   - 'primaryReverse': 반전 스타일 (배경색: 흰색, 텍스트: 브랜드 색상, 테두리 있음)
 *   - 'danger': 위험 스타일 (배경색: 빨간색, 텍스트: 흰색)
 *   - 'dangerReverse': 반전 위험 스타일 (배경색: 흰색, 텍스트: 기본 색상, 테두리 있음)
 *
 * @returns {JSX.Element} 렌더링된 버튼 컴포넌트
 */

export default function ModalButton({
  text,
  onClick,
  color,
}: {
  text: string;
  onClick: () => void;
  color:
    | 'primary'
    | 'primaryReverse'
    | 'danger'
    | 'dangerReverse';
}) {
  const buttonStyle = {
    primary: 'bg-brand-primary text-white',
    primaryReverse:
      'bg-white text-brand-primary border border-brand-primary',
    danger: 'bg-s-danger text-white',
    dangerReverse:
      'bg-white text-t-default border border-t-default',
  };

  const style = buttonStyle[color];

  return (
    <button
      onClick={onClick}
      className={`${style} text-16sm flex h-pr-48 w-pr-280 items-center justify-center rounded-xl`}
    >
      {text}
    </button>
  );
}
