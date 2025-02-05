import { useEffect, useState } from 'react';

/**
 * 스낵바의 가시성을 관리하는 훅
 * @param open 스낵바 오픈 여부
 * @param autoHideDuration 자동 숨김 시간
 * @param onClose 스낵바 닫기 콜백
 */
const useSnackBarVisibility = (
  open: boolean,
  autoHideDuration: number,
  onClose: () => void,
): boolean => {
  const [visible, setVisible] = useState(open);

  // STUB 스낵바가 열리거나 닫힐 때 가시성을 변경 (useEffect)
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    if (open) {
      setVisible(true);

      timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 250);
      }, autoHideDuration);
    } else {
      setVisible(false);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [open, autoHideDuration, onClose]);

  return visible;
};

export { useSnackBarVisibility };
