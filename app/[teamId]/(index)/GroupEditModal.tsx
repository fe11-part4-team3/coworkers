import { FormEvent } from 'react';

import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import Profile from '@/components/Profile/Profile';
import useModalStore from '@/stores/modalStore';
import useForm from '@/hooks/useForm';
import { IGroupDetail } from '@/types/group.type';
import updatePayloadSubmit from '@/utils/updatePayload';

import { _UpdateGroupParams } from './TeamPage.type';

interface GroupEditModalProps {
  group: IGroupDetail;
  onEdit: (params: _UpdateGroupParams) => void;
}

export default function GroupEditModal({ group, onEdit }: GroupEditModalProps) {
  const { closeModal } = useModalStore();
  const {
    formData,
    preview,
    handleInputChange,
    handleFileChange,
    changedFields,
    resetForm,
  } = useForm({
    name: group.name,
    image: group.image || '',
  });

  const disabledForm = !Object.values(changedFields).some((value) => value);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabledForm) return;

    await updatePayloadSubmit({
      changedFields: changedFields,
      formData,
      mutate: onEdit,
    });

    resetForm();
  };

  return (
    <div>
      <h2 className="mb-pr-16 text-center text-16m">팀 수정하기</h2>
      <form
        className="flex flex-col items-center gap-pr-16"
        onSubmit={handleSubmit}
      >
        <Profile
          variant="group"
          image={preview || formData.image}
          onSelectFile={handleFileChange}
          isEdit
        />
        <InputField
          type="text"
          name="name"
          label="팀 이름"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="팀 이름을 입력해주세요."
          required
        />
        <div className="modal-button-wrapper w-full">
          <Buttons
            text="닫기"
            onClick={closeModal}
            border="primary"
            backgroundColor="white"
            textColor="primary"
          />
          <Buttons
            text="변경하기"
            type="submit"
            loading={false}
            disabled={disabledForm}
          />
        </div>
      </form>
    </div>
  );
}
