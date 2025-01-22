'use client';

import ResetPassword from '@/components/modal/ResetPassword';
// import MemberProfile from '@/components/modal/MemberProfile';
// import Logout from '@/components/modal/Logout';
// import InviteMember from '@/components/modal/InviteMember';
// import DeleteTask from '@/components/modal/DeleteTask';
// import DeleteAccount from '@/components/modal/DeleteAccount';
// import ChangePassword from '@/components/modal/ChangePassword';
// import AddTeam from '@/components/modal/AddTeam';
// import AddTaskList from '@/components/modal/AddTaskList';
// import AddTask from '@/components/modal/AddTask';
// import AddList from '@/components/modal/AddList';
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
        <ResetPassword onClick={fetchData} />
      </div>
    </>
  );
}
