import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import Plus from '@/public/images/icon-imageUploadPlus.svg';
import Cancel from '@/public/images/icon-cancel.svg';

/**
 * @param {File | null} props.fileValue - 현재 선택된 파일
 * @param {React.Dispatch<React.SetStateAction<File | null>>} props.setFileValue - 파일 상태를 업데이트하는 함수
 * @returns {JSX.Element} 이미지 업로드 컴포넌트
 */
function ImageUpload({
  fileValue,
  setFileValue,
}: {
  fileValue: File | null;
  setFileValue: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [preview, setPreview] = useState<string | null>(null);

  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setFileValue(files[0]);
  };

  useEffect(() => {
    if (!fileValue) {
      return;
    }

    const nextPreview = URL.createObjectURL(fileValue);
    setPreview(nextPreview);

    return () => {
      setPreview(null);
      URL.revokeObjectURL(nextPreview);
    };
  }, [fileValue]);

  const handleClearClick = () => {
    if (ref.current) {
      ref.current.value = '';
    }
    setFileValue(null);
  };

  return (
    <>
      {preview ? (
        <div
          className={`group relative size-pr-240 cursor-pointer overflow-hidden rounded-pr-12`}
        >
          <Image
            src={preview}
            alt="이미지 업로드"
            className="object-cover"
            fill
          />

          <div
            className={`group absolute inset-0 flex items-center justify-center bg-black bg-opacity-40`}
          >
            <button
              className="duration-300 group-hover:-rotate-90"
              onClick={handleClearClick}
            >
              <Cancel />
            </button>
          </div>
        </div>
      ) : (
        <label
          htmlFor="imageUpload"
          className={`group relative flex size-pr-240 cursor-pointer items-center justify-center overflow-hidden rounded-pr-12 border bg-b-secondary`}
        >
          <div className="flex flex-col items-center">
            <div className="duration-300 group-hover:rotate-90">
              <Plus />
            </div>
            <span className="mt-pr-12 text-16 text-t-disabled">
              이미지 등록
            </span>
          </div>
          <input
            id="imageUpload"
            type="file"
            ref={ref}
            onChange={handleChange}
            className="hidden"
          />
        </label>
      )}
    </>
  );
}

export default ImageUpload;
