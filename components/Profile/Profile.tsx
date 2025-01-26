import Image from 'next/image';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import useThemeMode, { Theme } from '@/hooks/useThemeMode';

type Variant = 'member' | 'group';

type ProfileImageType = {
  [key in Variant]: {
    [key in Theme]: string;
  };
};
const PROFILE_IMAGE: ProfileImageType = {
  member: {
    dark: '/images/icon-profile-member.svg',
    light: '/images/icon-profile-member-light.svg',
  },
  group: {
    dark: '/images/icon-profile-image.svg',
    light: '/images/icon-profile-image-light.svg',
  },
};

type EditButtonType = {
  [key in Theme]: string;
};
const EDIT_BUTTON: EditButtonType = {
  dark: '/images/icon-edit-small.svg',
  light: '/images/icon-edit-small-light.svg',
};

type ProfileProps = {
  defaultProfile?: string | undefined | null;
  variant: Variant;
  profileSize?: number;
  isEdit?: boolean;
  editSize?: number;
  onSelectFile?: (file: File) => void;
  selectTheme?: Theme;
};

/**
 * 프로필 컴포넌트
 * @param defaultProfile 기본 사진의 경로
 * @param variant 표기할 기본 사진의 종류
 * @param profileSize 프로필 이미지 사이즈
 * @param isEdit 수정 버튼 표기 여부
 * @param editSize 수정 버튼 사이즈
 * @param onSelectFile 파일 선택 시 실행할 함수
 * @param selectTheme 원하는 테마 선택
 */
export default function Profile({
  defaultProfile,
  variant,
  profileSize = 64,
  isEdit = false,
  editSize = 24,
  onSelectFile,
  selectTheme,
}: ProfileProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const theme = useThemeMode(selectTheme);

  // 파일 선택 시 프리뷰 및 파일 상태 변경
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files[0]) {
        setFile(files[0]);
        onSelectFile?.(files[0]);
      }
    },
    [onSelectFile],
  );

  useEffect(() => {
    if (file) {
      const next = URL.createObjectURL(file);
      setPreview(next);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [file, preview]);

  return (
    <fieldset className="relative size-fit select-none">
      <label
        htmlFor={isEdit ? 'edit' : undefined}
        className={`relative ${isEdit && 'cursor-pointer hover:opacity-70'}`}
        aria-label={`${variant} 프로필 이미지${isEdit ? ' 수정' : ''}`}
      >
        <div
          className={`relative overflow-hidden rounded-full ${profileSize > 32 ? 'border-2' : 'border'}`}
          style={{ width: profileSize, height: profileSize }}
        >
          <Image
            className="size-full object-cover"
            width={profileSize}
            height={profileSize}
            src={preview || defaultProfile || PROFILE_IMAGE[variant][theme]}
            alt={`${variant} 프로필 이미지`}
          />
        </div>

        {isEdit && (
          <Image
            className="absolute -bottom-pr-4 -right-pr-4"
            width={editSize}
            height={editSize}
            src={EDIT_BUTTON[theme]}
            alt="수정"
          />
        )}
      </label>
      <input
        id="edit"
        type="file"
        className="hidden"
        onChange={handleChange}
        accept="image/jpeg, image/png, image/webp, image/jpg"
      />
    </fieldset>
  );
}
