import { useCallback, useEffect, useState } from 'react';

interface UseFileHandlerProps {
  onFileChange?: (file: File) => void;
}

export function useFileHandler({ onFileChange }: UseFileHandlerProps) {
  const [preview, setPreview] = useState<string>(); // 미리보기 URL
  const [error, setError] = useState<string>(); // 에러 메시지

  // 파일 변경 핸들러
  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;

      if (files && files[0]) {
        const file = files[0];
        const MAX_SIZE_BYTES = 10 * 1024 * 1024;

        // 파일 크기 검증
        if (file.size > MAX_SIZE_BYTES) {
          setError('파일 크기는 10MB 이하여야 합니다.');
          return;
        }

        // 미리보기 URL 생성
        setPreview(URL.createObjectURL(file));
        setError(''); // 에러 초기화

        // 유효한 파일을 부모로 전달
        if (onFileChange) onFileChange(file);
      }
    },
    [onFileChange],
  );

  // 미리보기 URL 메모리 해제
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return { preview, error, handleFileChange };
}
