import { useEffect, useRef } from 'react';

/**
 * 외부 클릭 감지 훅 (ex. 모달 외부 클릭 시 모달 닫기)
 * 클릭한 위치가 지정된 ref 외부일 경우, 제공된 콜백 함수를 실행합니다.
 *
 * @param callback 외부 클릭 시 실행할 함수
 * @returns 클릭 감지를 위한 ref
 */

export function useClickOutside({
  callback,
  isOpen,
}: {
  callback: () => void;
  isOpen: boolean;
}) {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener(
      'mousedown',
      handleClickOutside,
    );
    return () => {
      document.removeEventListener(
        'mousedown',
        handleClickOutside,
      );
    };
  }, [isOpen]);

  return modalRef;
}
