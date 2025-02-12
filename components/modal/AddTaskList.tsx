'use client';

import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import { _CreateTaskListParams } from '@/app/[teamId]/(index)/TeamPage.type';
import useForm from '@/hooks/useForm';
import { FormEvent } from 'react';

const INIT_VALUES: _CreateTaskListParams = { name: '' };

interface AddTaskListProps {
  onCreate: (params: _CreateTaskListParams) => void;
}

/**
 * 할 일 목록 추가 모달 컴포넌트.
 * 만들기 버튼 클릭 시 할 일 목록을 추가하는 기능을 제공합니다.
 *
 * @param {Function} onCreate - 할 일 목록 생성 함수
 */

export default function AddTaskList({ onCreate }: AddTaskListProps) {
  const { formData, errorMessage, handleInputChange } = useForm(INIT_VALUES);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onCreate(formData);
  };

  return (
    <>
      <CloseButton />
      <div className="modal-title-wrapper">
        <h2 className="modal-title">할 일 목록</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="목록 명을 입력해주세요."
          errorMessage={errorMessage.name}
        />
        <div className="modal-button-wrapper">
          <Buttons text="만들기" type="submit" disabled={!!errorMessage.name} />
        </div>
      </form>
    </>
  );
}
