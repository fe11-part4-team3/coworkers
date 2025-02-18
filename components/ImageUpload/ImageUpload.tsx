import Image from 'next/image';

import { useDeviceType } from '@/contexts/DeviceTypeContext';
import ICON_PLUS from '@/public/images/icon-plus.svg';

interface ImageUploadProps {
  preview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearPreview: () => void;
}

/**
 * @param {File | null} props.fileValue - 현재 선택된 파일
 * @param {React.Dispatch<React.SetStateAction<File | null>>} props.setFileValue - 파일 상태를 업데이트하는 함수
 * @returns {JSX.Element} 이미지 업로드 컴포넌트
 */
function ImageUpload({
  preview,
  handleFileChange,
  handleClearPreview,
}: ImageUploadProps) {
  const deviceType = useDeviceType();
  const mobile = deviceType === 'mobile';

  return (
    <>
      <label
        htmlFor="imageUpload"
        className="mb-pr-16 inline-block text-16m mo:text-14m"
      >
        이미지
      </label>

      {preview ? (
        <div
          className={`group relative size-pr-240 cursor-pointer overflow-hidden rounded-pr-12 mo:size-pr-160`}
        >
          <Image
            src={preview}
            alt="이미지 업로드"
            className="object-cover"
            fill
          />

          <button
            type="button"
            className={`group absolute inset-0 flex items-center justify-center bg-black/40`}
            onClick={() => handleClearPreview()}
          >
            <Image
              src="/images/icon-cancel.svg"
              alt="이미지 업로드"
              className="duration-300 group-hover:rotate-90"
              width={!mobile ? 48 : 24}
              height={!mobile ? 48 : 24}
            />
          </button>
        </div>
      ) : (
        <label
          htmlFor="imageUpload"
          className={`group relative flex size-pr-240 cursor-pointer items-center justify-center overflow-hidden rounded-pr-12 border bg-b-secondary transition-colors hover:border-i-hover mo:size-pr-160`}
        >
          <div className="flex flex-col items-center">
            <ICON_PLUS
              className="text-t-disabled duration-300 group-hover:-rotate-90"
              width={!mobile ? 55 : 24}
              height={!mobile ? 55 : 24}
            />
            <span className="mt-pr-12 text-16 text-t-disabled mo:text-14">
              이미지 등록
            </span>
          </div>
          <input
            name="image"
            id="imageUpload"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}
    </>
  );
}

export default ImageUpload;
