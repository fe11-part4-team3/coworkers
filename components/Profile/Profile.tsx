import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

type Variant = 'member' | 'group';

type Theme = 'dark' | 'light';
const DEFAULT_THEME = 'dark';

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
  defaultProfile?: string;
  variant: Variant;
  profileSize?: number;
  isEdit?: boolean;
  editSize?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  selectTheme?: Theme;
};

/**
 * 프로필 컴포넌트트
 * @param defaultProfile 기본 사진의 경로
 * @param vriant 표기할 기본 사진의 종류
 * @param profileSize 프로필 이미지 사이즈
 * @param isEdit 수정 버튼 표기 여부
 * @param editSize 수정 버튼 사이즈
 * @param onChange Change 핸들러
 * @param selectTheme 원하는 테마 선택
 */
export default function Profile({
  defaultProfile,
  variant,
  profileSize = 64,
  isEdit = false,
  editSize = 24,
  onChange,
  selectTheme,
}: ProfileProps) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }

    if (onChange) onChange(event);
  }, []);

  useEffect(() => {
    if (selectTheme) {
      setCurrentTheme(selectTheme);
      return;
    }

    if (theme === 'system') {
      const next = systemTheme || DEFAULT_THEME;
      setCurrentTheme(next);
      return;
    }

    if (theme === 'dark' || theme === 'light') {
      setCurrentTheme(theme);
      return;
    }

    setCurrentTheme(DEFAULT_THEME);
  }, [theme, systemTheme, selectTheme]);

  useEffect(() => {
    if (file) {
      const next = URL.createObjectURL(file);
      setPreview(next);
    }

    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [file]);

  return (
    <fieldset className="size-fit select-none">
      <label
        htmlFor={isEdit ? 'edit' : undefined}
        className={`relative ${isEdit && 'cursor-pointer'}`}
        aria-label={`${variant} 프로필 이미지${isEdit ? ' 수정' : ''}`}
      >
        <div
          className="overflow-hidden rounded-full"
          style={{ width: profileSize, height: profileSize }}
        >
          <Image
            className="size-full object-cover"
            width={profileSize}
            height={profileSize}
            src={
              preview || defaultProfile || PROFILE_IMAGE[variant][currentTheme]
            }
            alt={`${variant} 프로필 이미지`}
          />
        </div>

        {isEdit && (
          <Image
            className="absolute bottom-[-4px] right-[-4px]"
            width={editSize}
            height={editSize}
            src={EDIT_BUTTON[currentTheme]}
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
