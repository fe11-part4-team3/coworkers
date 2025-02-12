'use client';

import { useMutation } from '@tanstack/react-query';

import useModalStore from '@/stores/modalStore';
import Buttons from '@/components/Buttons';
import InputField from '@/components/InputField/InputField';
import useForm from '@/hooks/useForm';
import { ResetPasswordEmailParams } from '@/types/user.type';
import { resetPasswordEmail } from '@/service/user.api';
import { useSnackbar } from '@/contexts/SnackBar.context';

/**
 * 비밀번호 재설정 모달 컴포넌트.
 * 링크 보내기 버튼 클릭 시 비밀번호 재설정 링크를 보내는 기능을 제공합니다.
 */
export default function ResetPassword() {
  const { closeModal } = useModalStore();
  const { showSnackbar } = useSnackbar();

  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://coworkers.netlify.app';

  const {
    formData: createResetUrl,
    handleInputChange: handleEmailChange,
    errorMessage: errorEmail,
    resetForm,
  } = useForm<ResetPasswordEmailParams>({
    email: '',
    redirectUrl: origin,
  });

  const { mutate: resetPasswordMutate, isPending } = useMutation({
    mutationFn: resetPasswordEmail,
    onSuccess: () => {
      showSnackbar('비밀번호 재설정 링크를 보냈습니다. 이메일을 확인해주세요.');
      resetForm();
      closeModal();
    },
    onError: () =>
      showSnackbar(
        '존재하지 않는 이메일 입니다. 이메일을 확인해주세요.',
        'error',
      ),
  });

  return (
    <>
      <div className="modal-title-wrapper">
        <h2 className="modal-title">비밀번호 재설정</h2>
        <p className="modal-subTitle">비밀번호 재설정 링크를 보내드립니다.</p>
      </div>
      <InputField
        type="email"
        name="email"
        value={createResetUrl.email}
        errorMessage={errorEmail.email}
        onChange={handleEmailChange}
        placeholder="이메일을 입력하세요"
      />
      <div className="modal-button-wrapper">
        <Buttons
          text="닫기"
          onClick={closeModal}
          border="primary"
          backgroundColor="white"
          textColor="primary"
        />
        <Buttons
          text="링크 보내기"
          onClick={() => resetPasswordMutate(createResetUrl)}
          disabled={isPending || !(errorEmail.email === '')}
          loading={isPending}
        />
      </div>
    </>
  );
}
