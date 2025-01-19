/**
 * 모달 컴포넌트의 기본 레이아웃을 정의합니다.
 *
 * @param children 모달 내부에 표시할 컴포넌트
 * @param className 모달에 적용할 클래스 이름 (테일윈드 클래스 이름을 문자열로 전달해주세요.)
 * @returns {JSX.Element} 모달 컴포넌트
 */

import useModalStore from '@/stores/modalStore';

export default function ModalBase({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-10 bg-black bg-opacity-50"
        onClick={closeModal}
      />
      <div
        className={`${className} absolute z-20 flex w-pr-380 flex-col items-center justify-between rounded-xl bg-popover pb-pr-32 mo:bottom-0 mo:w-full mo:rounded-b-none`}
      >
        {children}
      </div>
    </>
  );
}
