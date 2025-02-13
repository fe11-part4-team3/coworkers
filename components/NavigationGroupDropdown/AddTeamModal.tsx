'use client';

import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';

export default function AddTeamModal() {
  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">팀 추가하기</h2>
      </div>
      <div className="modal-button-wrapper">
        <Buttons text="팀 생성하기" href="/addteam" />
      </div>
      <div className="modal-button-wrapper">
        <Buttons text="팀 참여하기" href="/jointeam" />
      </div>
    </>
  );
}
