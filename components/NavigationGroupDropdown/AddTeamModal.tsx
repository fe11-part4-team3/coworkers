'use client';

import { useRouter } from 'next/navigation';

import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import useModalStore from '@/stores/modalStore';

export default function AddTeamModal() {
  const router = useRouter();
  const { closeModal } = useModalStore();

  const handleClickAdd = () => {
    router.push('/addteam');
    closeModal();
  };

  const handleClickJoin = () => {
    router.push('/jointeam');
    closeModal();
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">팀 추가하기</h2>
      </div>
      <div className="modal-button-wrapper">
        <Buttons text="팀 생성하기" onClick={handleClickAdd} />
      </div>
      <div className="modal-button-wrapper">
        <Buttons text="팀 참여하기" onClick={handleClickJoin} />
      </div>
    </>
  );
}
