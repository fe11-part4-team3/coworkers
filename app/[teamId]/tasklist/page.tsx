'use client';

import ResetPassword from '@/components/modal/ResetPassword';
import useModalStore from '@/stores/modalStore';

export default function TaskListPage() {
  const { openModal } = useModalStore();

  const handleOnclick = () => {
    console.log('클릭했당');
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <button onClick={openModal}>
          팝업 등장
          우와아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아아악
          불투명도 테스트테스트
        </button>
        <ResetPassword onClick={handleOnclick} />
      </div>
    </>
  );
}
