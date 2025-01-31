import Image from 'next/image';
import classNames from 'classnames';

import IconProfile from './IconProfile';
import IconEdit from './IconEdit';
import InputLabel from '../InputField/InputLabel';
import ErrorMessage from '../InputField/ErrorMessage';

// 타입 정의
type Variant = 'member' | 'group';

interface ProfileProps {
  image?: string | null;
  variant: Variant;
  label?: string;
  isEdit?: boolean;
  editSize?: number;
  profileSize?: number;
  errorMessage?: string;
  onSelectFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * 프로필 컴포넌트
 * @param variant 프로필 타입 (member, group)
 * @param preview 미리보기 이미지 URL
 * @param label 레이블
 * @param image 프로필 이미지 URL
 * @param profileSize 프로필 이미지 크기 (기본값: 64)
 * @param isEdit 수정 버튼 표시 여부
 * @param editSize 수정 버튼 크기 클래스 (기본값: 24)
 * @param errorMessage 에러 메시지
 * @param onSelectFile 파일 선택 시 호출될 콜백 함수
 */
export default function Profile({
  image,
  variant,
  label,
  profileSize = 64,
  editSize = 24,
  isEdit = false,
  errorMessage,
  onSelectFile,
}: ProfileProps) {
  // 프로필 이미지 또는 기본 아이콘
  const renderProfileImage = () =>
    image ? (
      <Image
        width={profileSize || 64}
        height={profileSize || 64}
        src={image || ''}
        alt={`${variant} 프로필 이미지`}
        className="h-full w-auto"
      />
    ) : (
      <IconProfile variant={variant} size={profileSize} />
    );

  return (
    <div>
      <fieldset className="relative size-fit select-none">
        {label && <InputLabel label={label} />}
        <label
          htmlFor={isEdit ? 'edit' : ''}
          aria-label={`${variant} 프로필 이미지${isEdit && ' 수정'}`}
          className={classNames(
            'relative',
            isEdit && 'cursor-pointer hover:opacity-70',
          )}
        >
          <div
            className={classNames(
              'flex items-center justify-center overflow-hidden rounded-full',
              profileSize > 32 ? 'border-2' : 'border',
            )}
            style={{ width: profileSize, height: profileSize }}
          >
            {renderProfileImage()}
          </div>

          {isEdit && (
            <IconEdit
              className="absolute -bottom-pr-4 -right-pr-4"
              size={editSize}
            />
          )}
        </label>
        {isEdit && (
          <input
            id="edit"
            type="file"
            className="hidden"
            onChange={onSelectFile}
            accept="image/jpeg, image/png, image/webp, image/jpg"
          />
        )}
      </fieldset>
      {errorMessage && <ErrorMessage message={errorMessage} />}
    </div>
  );
}
