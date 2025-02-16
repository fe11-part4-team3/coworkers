'use client';

import { useMutation } from '@tanstack/react-query';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import useForm from '@/hooks/useForm';
import { updatePassword } from '@/service/user.api';
import { useSnackbar } from '@/contexts/SnackBar.context';

/**
 * 비밀번호 변경 모달 컴포넌트.
 * 변경하기 버튼 클릭 시 비밀번호 변경 기능을 제공합니다.
 */
export default function ChangePassword() {
  const { closeModal } = useModalStore();
  const { showSnackbar } = useSnackbar();

  const {
    formData: passwordData,
    handleInputChange,
    errorMessage,
  } = useForm({
    passwordConfirmation: '',
    password: '',
  });

  const { mutate: updatePasswordMutate, isPending: isupdatePassword } =
    useMutation({
      mutationFn: updatePassword,
      onSuccess: () => showSnackbar('패스워드가 변경 되었습니다.'),
      onError: () => showSnackbar('패스워드 변경에 실패 했습니다.', 'error'),
    });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePasswordMutate(passwordData);
    closeModal();
  };

  return (
    <>
      <div className="modal-title-wrapper">
        <h2 className="modal-title">비밀번호 변경하기</h2>
      </div>
      <form className="w-full" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-pr-16">
          <InputField
            type="password"
            name="password"
            value={passwordData.password}
            placeholder="새 비밀번호를 입력해주세요."
            label="새 비밀번호"
            autoComplete="new-password"
            errorMessage={errorMessage.password}
            onChange={handleInputChange}
            required
          />
          <InputField
            type="password"
            name="passwordConfirmation"
            value={passwordData.passwordConfirmation}
            autoComplete="new-password"
            placeholder="새 비밀번호를 다시 한 번 입력해주세요."
            label="새 비밀번호 확인"
            errorMessage={errorMessage.passwordConfirmation}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="modal-button-wrapper">
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
            loading={isupdatePassword}
            disabled={
              isupdatePassword ||
              !(
                errorMessage.password === '' &&
                errorMessage.passwordConfirmation === ''
              )
            }
          />
        </div>
      </form>
    </>
  );
}
