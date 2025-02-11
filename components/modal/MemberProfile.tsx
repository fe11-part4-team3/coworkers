'use client';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import Profile from '@/components/Profile/Profile';
<<<<<<< HEAD
=======
import { useSnackbar } from '@/contexts/SnackBar.context';
import { IMember } from '@/types/group.type';

interface MemberProfileProps {
  member: IMember;
}
>>>>>>> 4c0e52f (💄 이메일 복사 시 스낵바 적용)

/**
 * 멤버 프로필 모달 컴포넌트.
 * 이메일 복사하기 버튼 클릭 시 이메일을 복사하는 기능을 제공합니다.
 *
 * @param {Function} onClick - 모달 실행 함수 (이메일 복사 기능을 처리하는 함수 전달해주세요.)
 * @param {string} image - 멤버 이미지 (디폴트 이미지는 해당 컴포넌트에서 처리, 멤버 이미지가 있을 때 props로 경로 전달해주세요.)
 * @param {string} name - 멤버 이름
 * @param {string} email - 멤버 이메일
 */

<<<<<<< HEAD
export default function MemberProfile({
  onClick,
  image,
  name,
  email,
}: {
  onClick: () => void;
  image?: string;
  name: string;
  email: string;
}) {
  const { closeModal } = useModalStore();

  const handleOnClick = () => {
    onClick();
    closeModal();
=======
export default function MemberProfile({ member }: MemberProfileProps) {
  const { showSnackbar } = useSnackbar();

  const handleClickCopyEmail = () => {
    navigator.clipboard.writeText(member.userEmail);
    showSnackbar('이메일을 클립보드에 복사했습니다.', 'success', 2000);
>>>>>>> 4c0e52f (💄 이메일 복사 시 스낵바 적용)
  };

  return (
    <>
      <CloseButton />
      <div className="w-full">
        <div className="mb-pr-24 flex flex-col items-center">
          <Profile image={image} variant="member" />
          <h2 className="mb-pr-8 mt-pr-24 text-18 text-t-primary">{name}</h2>
          <p className="text-14 text-t-secondary">{email}</p>
        </div>
      </div>
      <Buttons text="이메일 복사하기" onClick={handleOnClick} />
    </>
  );
}
