import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
} from 'react';

import SnackBar from '@/components/SnackBar/SnackBar.styled';
import {
  ISnackBarProps,
  ISnackbarContextProps,
  TSnackbarQueueItem,
  TCurrentSnackbarState,
} from '@/components/SnackBar/SnackBar.type';

// STUB 스낵바 초기 상태
const INITIAL_SNACKBAR_STATE: TCurrentSnackbarState = {
  open: false,
  message: '',
  severity: 'success',
  autoHideDuration: 2500,
};

const SnackbarContext = createContext<ISnackbarContextProps | undefined>(
  undefined,
);

const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [queue, setQueue] = useState<TSnackbarQueueItem[]>([]);
  const [currentSnackbar, setCurrentSnackbar] = useState<TCurrentSnackbarState>(
    INITIAL_SNACKBAR_STATE,
  );

  /**
   * 스낵바를 띄웁니다.
   * @param message 메시지
   * @param severity 알림 종류
   * @param autoHideDuration 자동 숨김 시간
   */
  const showSnackbar = useCallback(
    (
      message: string,
      severity: ISnackBarProps['severity'] = 'success',
      autoHideDuration = 2500,
    ) => {
      setQueue((prev) => [...prev, { message, severity, autoHideDuration }]);
    },
    [],
  );

  const handleClose = useCallback(() => {
    setCurrentSnackbar((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    // 현재 스낵바가 닫히고 대기열에 항목이 남아 있다면 다음 스낵바를 표시
    if (!currentSnackbar.open && queue.length > 0) {
      const [nextSnackbar, ...remainingQueue] = queue;
      setQueue(remainingQueue);
      if (nextSnackbar) {
        setCurrentSnackbar({
          ...nextSnackbar,
          message: nextSnackbar.message || '',
          severity: nextSnackbar.severity || 'success',
          open: true,
        });
      }
    }
  }, [queue, currentSnackbar.open]);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackBar
        open={currentSnackbar.open}
        onClose={handleClose}
        severity={currentSnackbar.severity}
        autoHideDuration={currentSnackbar.autoHideDuration}
      >
        {currentSnackbar.message}
      </SnackBar>
    </SnackbarContext.Provider>
  );
};

const useSnackbar = (): ISnackbarContextProps => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbar는 SnackbarProvider 내부에서 사용되어야 합니다.',
    );
  }
  return context;
};

export { SnackbarProvider, useSnackbar };
