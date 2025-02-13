import { useCallback, useEffect, useState } from 'react';

import type { TAction, TFormValue } from '@/types/useForm.type';

export interface UseFileHandlerProps<T extends Record<string, TFormValue>> {
  dispatch?: React.Dispatch<TAction<T>>;
  fileFieldKey?: keyof T;
  onFileChange?: (file: File) => void;
  onFileClear?: () => void;
  onErrorChange?: (error: string) => void;
}

export function useFileHandler<T extends Record<string, TFormValue>>({
  dispatch,
  fileFieldKey,
  onFileChange,
  onFileClear,
  onErrorChange,
}: UseFileHandlerProps<T>) {
  const [preview, setPreview] = useState<string>('');
  const [error, setError] = useState<string>('');

  // 파일 변경 핸들러
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files[0]) {
        const file = files[0];
        const MAX_SIZE_BYTES = 10 * 1024 * 1024;

        // 파일 크기 검증
        if (file.size > MAX_SIZE_BYTES) {
          const errorMsg = '파일 크기는 10MB 이하여야 합니다.';
          setError(errorMsg);
          setPreview('');
          if (onErrorChange) onErrorChange(errorMsg);
          return;
        }

        // 미리보기 URL 생성
        const newPreview = URL.createObjectURL(file);
        setPreview(newPreview);
        setError('');
        if (onErrorChange) onErrorChange('');

        // dispatch를 통한 파일 상태 업데이트 (필드 업데이트, 변경 상태 설정)
        if (dispatch && fileFieldKey) {
          dispatch({
            type: 'UPDATE_FORM_FIELD',
            key: fileFieldKey,
            value: file,
          });
          dispatch({
            type: 'SET_CHANGED_FIELD',
            key: fileFieldKey,
            changed: true,
          });
        }

        // 추가 onFileChange 콜백 실행 (옵션)
        if (onFileChange) onFileChange(file);
      }
    },
    [dispatch, fileFieldKey, onErrorChange, onFileChange],
  );

  /**
   * 미리보기 초기화 핸들러
   * @param isReset - true이면 리셋 상황으로 간주하여 changed 값을 false로 설정
   */
  const handleClearPreview = useCallback(
    (isReset?: boolean) => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview('');

      // dispatch를 통한 파일 초기화 (필드 업데이트, 변경 상태 설정)
      if (dispatch && fileFieldKey) {
        dispatch({
          type: 'UPDATE_FORM_FIELD',
          key: fileFieldKey,
          value: '',
        });
        dispatch({
          type: 'SET_CHANGED_FIELD',
          key: fileFieldKey,
          changed: isReset ? false : true,
        });
      }

      // 추가 onFileClear 콜백 실행 (옵션)
      if (onFileClear) onFileClear();
    },
    [dispatch, fileFieldKey, onFileClear, preview],
  );

  // 미리보기 URL 메모리 해제
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return { preview, error, handleFileChange, handleClearPreview };
}
