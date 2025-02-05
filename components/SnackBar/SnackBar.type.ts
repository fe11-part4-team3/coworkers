// STUB 스낵바 컴포넌트 디폴트 프롭스
interface ISnackBarDefaultProps {
  severity: 'error' | 'success' | undefined;
  children: string;
  open: boolean;
  autoHideDuration?: number | undefined;
}

// STUB 스낵바 컴포넌트 프롭스
interface ISnackBarProps extends ISnackBarDefaultProps {
  onClose: () => void;
}

// STUB 스낵바 컨텍스트 프롭스
interface ISnackbarContextProps {
  showSnackbar: (
    message: string,
    severity?: ISnackBarProps['severity'],
    autoHideDuration?: number,
  ) => void;
}

// STUB 스낵바 큐 아이템 타입
type TSnackbarQueueItem = {
  message: string;
  severity: ISnackBarProps['severity'];
  autoHideDuration?: number;
};

// STUB 현재 스낵바 상태 타입
type TCurrentSnackbarState = {
  open: boolean;
  message: string;
  severity: ISnackBarProps['severity'];
  autoHideDuration?: number;
};

export type {
  ISnackBarProps,
  ISnackbarContextProps,
  TSnackbarQueueItem,
  TCurrentSnackbarState,
};
