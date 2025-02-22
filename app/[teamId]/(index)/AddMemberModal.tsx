import { FormEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import useModalStore from '@/stores/modalStore';
import useForm from '@/hooks/useForm';
import { inviteMember } from '@/service/group.api';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useGroup from '@/hooks/useGroup';

export default function AddMemberModal() {
  const { groupId, refetch } = useGroup();
  const { closeModal } = useModalStore();
  const { showSnackbar } = useSnackbar();
  const { formData, handleInputChange, errorMessage, resetForm } = useForm({
    email: '',
  });

  const disabledForm = Object.values(errorMessage).some((value) => value);

  const { mutate: inviteMemberMutate } = useMutation({
    mutationFn: () => inviteMember({ id: groupId, userEmail: formData.email }),
    onSuccess: () => {
      refetch();
      resetForm();
      showSnackbar('멤버를 추가했습니다.');
    },
    onError: (error: AxiosError) => {
      const message = (error.response?.data as { message?: string })?.message;
      showSnackbar(message || '멤버를 추가할 수 없습니다.', 'error');
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (disabledForm) return;
    inviteMemberMutate();
  };

  return (
    <>
      <div className="modal-title-wrapper">
        <h2 className="modal-title">멤버 추가하기</h2>
        <p className="modal-subTitle">이메일로 팀 멤버를 추가합니다.</p>
      </div>
      <form
        className="flex flex-col items-center gap-pr-16"
        onSubmit={handleSubmit}
      >
        <InputField
          type="text"
          name="email"
          label="이메일"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="초대할 사용자의 이메일을 입력해주세요."
          errorMessage={errorMessage.email}
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
            text="초대하기"
            type="submit"
            loading={false}
            disabled={disabledForm}
          />
        </div>
      </form>
    </>
  );
}
