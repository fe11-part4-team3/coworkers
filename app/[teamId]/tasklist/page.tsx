'use client';

import InviteMember from '@/components/modal/InviteMember';
import useModalStore from '@/stores/modalStore';

export default function TaskListPage() {
  const { openModal } = useModalStore();

  const handleOnclick = () => {
    console.log('클릭했당');
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <button onClick={openModal}>팝업 등장</button>
        <InviteMember onClick={handleOnclick} />
      </div>
    </>
  );
}
