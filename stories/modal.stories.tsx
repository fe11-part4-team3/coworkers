import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import Modal from '@/components/modal/Modal';
import Buttons from '@/components/Buttons';
import Container from '@/components/layout/Container';
import ResetPassword from '@/components/modal/ResetPassword';
import MemberProfile from '@/components/modal/MemberProfile';
import Logout from '@/components/modal/Logout';
import InviteMember from '@/components/modal/InviteMember';
import DeleteTask from '@/components/modal/DeleteTask';
import DeleteAccount from '@/components/modal/DeleteAccount';
import ChangePassword from '@/components/modal/ChangePassword';
import AddTeam from '@/components/modal/AddTeam';
import AddTaskList from '@/components/modal/AddTaskList';
import AddList from '@/components/modal/AddList';

// Meta 정보 설정
const meta: Meta = {
  title: 'Components/Modal',
  component: Modal,
};

export default meta;

// 스토리용 템플릿 컴포넌트
const Template: StoryFn = () => {
  // Modal Store에서 필요한 함수 추출
  const { openModal, closeModal } = useModalStore();

  // 모달 열기 핸들러
  const handleOpenModalResetPassword = () => {
    openModal(<ResetPassword />);
  };
  const handleOpenModalMemberProfile = () => {
    openModal(
      <MemberProfile
        onClick={() => handleAddTask}
        image=""
        name="이름"
        email="이메일"
      />,
    );
  };

  const handleOpenLogout = () => {
    openModal(
      <Logout
        onClick={() => {
          alert('로그아웃 실행');
          closeModal();
        }}
      />,
    );
  };

  const handleOpenInviteMember = () => {
    openModal(<InviteMember loading={false} onClick={() => handleAddTask} />);
  };

  const handleOpenDeleteTask = () => {
    openModal(<DeleteTask title="dd" onClick={() => handleAddTask} />);
  };
  const handleOpenDeleteAccount = () => {
    openModal(
      <DeleteAccount
        onClick={() => console.log('회원탈퇴 클릭')}
        isPending={false}
      />,
    );
  };
  const handleOpenChangePassword = () => {
    openModal(<ChangePassword />);
  };
  const handleOpenAddTeam = () => {
    openModal(<AddTeam onClick={() => handleAddTask} />);
  };
  const handleOpenAddTask = () => {
    openModal(<AddTask fetchData={() => handleAddTask} />);
  };
  const handleOpenAddTaskList = () => {
    openModal(<AddTaskList onCreate={() => handleAddTask} />);
  };
  const handleOpenAddList = () => {
    openModal(<AddList onClick={() => handleAddTask} />);
  };

  // AddTask의 onClick 핸들러 (테스트용)
  const handleAddTask = async (bodyData: object) => {
    console.log('AddTask onClick 실행:', bodyData);
    // 여기서 서버로 데이터 전송 로직을 추가할 수 있습니다.
    // 예시로 모달을 닫는 동작을 추가했습니다.
    closeModal();
  };

  return (
    <Container>
      {/* 모달 열기 버튼 */}
      <div className="flex flex-col justify-center gap-pr-20">
        <Buttons
          onClick={handleOpenModalResetPassword}
          text="비밀번호 재설정 모달 열기"
        />

        <Buttons
          onClick={handleOpenModalMemberProfile}
          text="멤버 프로필 모달 열기"
        />

        <Buttons onClick={handleOpenLogout} text="로그아웃 모달 열기" />
        <Buttons onClick={handleOpenInviteMember} text="멤버 초대 모달 열기" />
        <Buttons onClick={handleOpenDeleteTask} text="할일 삭제 모달 열기" />
        <Buttons onClick={handleOpenDeleteAccount} text="회원 탈퇴 모달 열기" />
        <Buttons
          onClick={handleOpenChangePassword}
          text="패스워드 변경 모달 열기"
        />
        <Buttons onClick={handleOpenAddTeam} text="팀 추가 모달 열기" />
        <Buttons onClick={handleOpenAddTask} text="할 일 만들기 모달 열기" />
        <Buttons onClick={handleOpenAddTaskList} text="할 일 목록 모달 열기" />
        <Buttons
          onClick={handleOpenAddList}
          text="새로운 목록 추가 모달 열기"
        />
      </div>

      {/* 모달 컴포넌트 */}
      <Modal />
    </Container>
  );
};

// 기본 스토리
export const Default = Template.bind({});
Default.args = {};
