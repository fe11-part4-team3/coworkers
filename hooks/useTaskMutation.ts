import { useMutation } from '@tanstack/react-query';

import { createTask } from '@/service/task.api';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useModalStore from '@/stores/modalStore';
import { createRecurring } from '@/service/recurring.api';

export function useTaskMutation() {
  const { showSnackbar } = useSnackbar();
  const { closeModal } = useModalStore();

  const createTaskMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      showSnackbar('할 일이 생성되었습니다.');
      closeModal();
    },
    onError: () => showSnackbar('할 일 생성에 실패했습니다.'),
  });

  const createRecurringTaskMutation = useMutation({
    mutationFn: createRecurring,
    onSuccess: () => {
      showSnackbar('할 일이 생성되었습니다.');
      closeModal();
    },
    onError: () => showSnackbar('할 일 생성에 실패했습니다.'),
  });

  return {
    createTaskMutation,
    createRecurringTaskMutation,
    isPending:
      createTaskMutation.isPending || createRecurringTaskMutation.isPending,
  };
}
