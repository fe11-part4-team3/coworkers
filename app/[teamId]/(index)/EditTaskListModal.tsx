'use client';

import { FormEvent } from 'react';

import InputField from '@/components/InputField/InputField';
import Buttons from '@/components/Buttons';
import CloseButton from '@/components/modal/ModalCloseButton';
import { _UpdateTaskListParams } from '@/app/[teamId]/(index)/TeamPage.type';
import useForm from '@/hooks/useForm';
import { ITaskList } from '@/types/taskList.type';

interface EditTaskListProps {
  taskList: ITaskList;
  onEdit: (params: _UpdateTaskListParams) => void;
}

/**
 * 할 일 목록 수정 모달 컴포넌트.
 *
 * @param props.taskList 할 일 목록 객체
 * @param props.onEdit - 할 일 목록 수정 함수
 */

export default function EditTaskListModal({
  taskList,
  onEdit,
}: EditTaskListProps) {
  const { formData, changedFields, errorMessage, handleInputChange } = useForm({
    name: taskList.name,
  });

  const validation = changedFields.name && !errorMessage.name;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onEdit({ id: taskList.id, ...formData });
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
          <Buttons text="수정하기" type="submit" disabled={!validation} />
        </div>
      </form>
    </>
  );
}
