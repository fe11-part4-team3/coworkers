import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import useModalStore from '@/stores/modalStore';
import AddTask from '@/components/modal/AddTask';
import Modal from '@/components/modal/Modal';
import Buttons from '@/components/Buttons';
import Container from '@/components/layout/Container';

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
  const handleOpenModalAddTask = () => {
    // AddTask 컴포넌트를 모달 콘텐츠로 설정
    openModal(<AddTask onClick={handleAddTask} />);
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
        <Buttons onClick={handleOpenModalAddTask} text="할 일 추가 모달 열기" />

        {/* TODO 모달을 추가해주세요 */}
        <Buttons
          onClick={() => alert('모달을 추가 해주세요')}
          text="모달 추가"
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
