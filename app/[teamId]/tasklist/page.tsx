'use client';

import AddList from '@/components/modal/AddList';
import useModalStore from '@/stores/modalStore';

export default function TaskListPage() {
  const { openModal } = useModalStore();

  const fetchData = async (body: object) => {
    console.log('fetchData', body);
  };

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center">
        <button onClick={openModal}>팝업</button>
        <AddList onClick={fetchData} />
      </div>
    </>
  );
}
