'use client';

import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import useModalStore from '@/stores/modalStore';

import AddMemberModal from './AddMemberModal';
import InvitationLinkModal from './InvitaionLinkModal';

export default function InviteMemberModal() {
  const { openModal } = useModalStore();

  const handleClickAddMember = () => {
    openModal(<AddMemberModal />);
  };

  const handleClickCopyLink = () => {
    openModal(<InvitationLinkModal />);
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">멤버 초대하기</h2>
      </div>
      <div className="modal-button-wrapper">
        <Buttons
          text="이메일로 초대"
          onClick={handleClickAddMember}
          backgroundColor="none"
          border="primary"
          textColor="primary"
        />
        <Buttons text="초대 링크 복사" onClick={handleClickCopyLink} />
      </div>
    </>
  );
}
