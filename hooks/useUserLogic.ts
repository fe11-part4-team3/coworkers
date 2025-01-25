import { useRouter } from 'next/navigation';
import useForm from '@/hooks/useForm';
import useUser from '@/hooks/useUser';
import useGenericMutation from '@/hooks/useGenericMutation';
import { deleteUser, updateUser } from '@/service/user.api';
import updatePayloadSubmit from '@/utils/updatePayload';

export const useUserLogic = () => {
  const { user, isPending: isUserLoading } = useUser(true);
  const route = useRouter();

  // 유저 수정 폼 상태
  const {
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    setChangedFields,
  } = useForm<{
    image: string | File;
    nickname: string;
  }>({
    image: user?.image || '',
    nickname: user?.nickname || '',
  });

  // 사용자 정보 수정 요청
  const { mutate: updateUserMutate, isPending: isUpdateUserPending } =
    useGenericMutation(updateUser, {
      onSuccess: () => alert('사용자 정보 수정에 성공했습니다.'),
      onError: () => alert('사용자 정보 수정에 실패했습니다.'),
      resetFunctions: [() => setChangedFields({})],
    });

  // 사용자 삭제 요청
  const handleUserDelete = async () => {
    const confirm = window.confirm('정말로 회원탈퇴를 진행하시겠습니까?');
    if (!confirm) return;

    try {
      const response = await deleteUser();
      if (!response) return;
      alert('회원탈퇴가 완료되었습니다.');
      route.push('/');
    } catch (err) {
      console.error('회원탈퇴 실패:', err);
      alert('회원탈퇴에 실패했습니다.');
    }
  };

  // 정보 수정 요청
  const handleSubmit = async () =>
    updatePayloadSubmit({
      changedFields,
      formData,
      mutate: updateUserMutate,
    });

  return {
    user,
    isUserLoading,
    isUpdateUserPending,
    formData,
    changedFields,
    handleInputChange,
    handleFileChange,
    handleSubmit,
    handleUserDelete,
  };
};
