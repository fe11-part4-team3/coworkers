'use client';

import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import Profile from '@/components/Profile/Profile';
import { useSnackbar } from '@/contexts/SnackBar.context';
import { IMember } from '@/types/group.type';

interface MemberProfileProps {
  member: IMember;
}

/**
 * 멤버 프로필 모달 컴포넌트.
 * 이메일 복사하기 버튼 클릭 시 이메일을 복사하는 기능을 제공합니다.
 *
 * @param props.member - 멤버 데이터
 */

export default function MemberProfile({ member }: MemberProfileProps) {
  const { showSnackbar } = useSnackbar();

  const handleClickCopyEmail = () => {
    navigator.clipboard.writeText(member.userEmail);
    showSnackbar('이메일을 클립보드에 복사했습니다.', 'success', 2000);
  };

  return (
    <>
      <CloseButton />
      <div className="w-full">
        <div className="mb-pr-24 flex flex-col items-center">
          <Profile image={member.userImage} variant="member" />
          <h2 className="mb-pr-8 mt-pr-24 text-18 text-t-primary">
            {member.userName}
          </h2>
          <p className="text-14 text-t-secondary">{member.userEmail}</p>
        </div>
      </div>
      <Buttons text="이메일 복사하기" onClick={handleClickCopyEmail} />
    </>
  );
}
