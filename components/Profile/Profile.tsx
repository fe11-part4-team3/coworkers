import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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
  src?: string;
  variant: Variant;
  profileSize?: number;
  isEdit?: boolean;
  editSzie?: number;
  onChange?: () => void;
};

/**
 * 프로필 컴포넌트트
 * @param src 사진의 경로
 * @param vriant 표기할 기본 사진의 종류
 * @param profileSize 프로필 이미지 사이즈
 * @param isEdit 수정 버튼 표기 여부
 * @param editSize 수정 버튼 사이즈
 * @param onClick 클린 핸들러
 */
export default function Profile({
  src,
  variant,
  profileSize = 64,
  isEdit = false,
  editSzie = 24,
  onChange,
}: ProfileProps) {
  const { theme, systemTheme } = useTheme();
  const [currentTheme, setCurrentTheme] = useState<Theme>(DEFAULT_THEME);

  useEffect(() => {
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
  }, [theme, systemTheme]);

  return (
    <fieldset className="size-fit">
      <label
        htmlFor={isEdit ? 'edit' : undefined}
        className={`relative ${isEdit && 'cursor-pointer'}`}
      >
        <Image
          width={profileSize}
          height={profileSize}
          src={src || PROFILE_IMAGE[variant][currentTheme]}
          alt={`${variant} 프로필 이미지`}
        />

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
      <input id="edit" type="file" className="hidden" onChange={onChange} />
    </fieldset>
  );
}
