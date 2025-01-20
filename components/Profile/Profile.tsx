import Image from 'next/image';

interface ProfileProps {
  src?: string;
  variant: 'member' | 'group';
  profileSize?: number;
  isEdit?: boolean;
  editSzie?: number;
  onClick?: () => void;
}

const PROFILE = {
  member: '/images/icon-profile-member.svg',
  group: '/images/icon-profile-image.svg',
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
  onClick = () => {},
}: ProfileProps) {
  return (
    <button className="relative size-fit p-0" onClick={onClick}>
      <Image
        width={profileSize}
        height={profileSize}
        src={src || PROFILE[variant]}
        alt="프로필"
      />
      {isEdit && (
        <Image
          className="absolute bottom-[-4px] right-[-4px]"
          width={editSzie}
          height={editSzie}
          src="/images/icon-edit-small.svg"
          alt="수정"
        />
      )}
    </button>
  );
}
