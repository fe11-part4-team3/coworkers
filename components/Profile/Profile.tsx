import Image from 'next/image';
import { useTheme } from 'next-themes';
import { ChangeEvent, useEffect, useState } from 'react';

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
  editSzie?: number;
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
  editSzie = 24,
  onChange,
  selectTheme,
}: ProfileProps) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);
  const [preview, setPreview] = useState<string | null>(null);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    //NOTE 새 프로필 삽일 시 기존 프리뷰 메모라 제거
    if (preview) URL.revokeObjectURL(preview);

    //NOTE 프리뷰 생성
    const files = event.target.files;
    if (files && files[0]) {
      const next = URL.createObjectURL(files[0]);
      setPreview(next);
    }

    //NOTE 상위 컴포넌트의 이벤트 핸들링
    if (onChange) onChange(event);
  };

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

    useEffect(() => {
      //NOTE 언마운트 시 프리뷰 메모리 제거
      return () => {
        if (preview) URL.revokeObjectURL(preview);
      };
    }, []);

    setCurrentTheme(DEFAULT_THEME);
  }, [theme, systemTheme, selectTheme]);

  return (
    <fieldset className="size-fit">
      <label
        htmlFor={isEdit ? 'edit' : undefined}
        className={`relative ${isEdit && 'cursor-pointer'}`}
      >
        <div
          className="overflow-hidden rounded-full"
          style={{ width: profileSize, height: profileSize }}
        >
          <Image
            className="h-full w-full object-cover"
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
            width={editSzie}
            height={editSzie}
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
