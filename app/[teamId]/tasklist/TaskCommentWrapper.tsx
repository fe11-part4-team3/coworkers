import { useMutation, useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import { ChangeEvent, FormEvent, useRef } from 'react';

import Comment from '@/components/Comment/Comment';
import { useSnackbar } from '@/contexts/SnackBar.context';
import useForm from '@/hooks/useForm';
import {
  createTaskComment,
  deleteTaskComment,
  getTaskComment,
  updateTaskComment,
} from '@/service/comment.api';
import IconEnter from '@/public/images/icon-enter.svg';

interface TaskCommentWrapper {
  taskId: number;
}

export default function TaskCommentWrapper({ taskId }: TaskCommentWrapper) {
  const { showSnackbar } = useSnackbar();

  const { formData, handleInputChange, errorMessage, resetForm } = useForm({
    content: '',
  });

  const commentValid = formData.content.length > 0 && !errorMessage.content;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: comments, refetch: refetchComment } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getTaskComment({ taskId }),
  });

  const sortedComments = comments?.sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
  );

  const { mutate: createTaskCommentMutate } = useMutation({
    mutationFn: ({ content }: { content: string }) =>
      createTaskComment({ taskId, content }),
    onSuccess: () => {
      refetchComment();
      resetForm({ content: '' });
      showSnackbar('댓글을 작성했습니다.');
    },
    onError: () => showSnackbar('댓글을 작성할 수 없습니다.', 'error'),
  });

  const { mutate: updateTaskCommentMutate } = useMutation({
    mutationFn: updateTaskComment,
    onSuccess: () => {
      refetchComment();
      showSnackbar('댓글이 수정되었습니다.');
    },
    onError: () => showSnackbar('댓글을 수정할 수 없습니다.', 'error'),
  });

  const { mutate: deleteTaskCommentMutate } = useMutation({
    mutationFn: (id: number) => deleteTaskComment({ taskId, commentId: id }),
    onSuccess: () => {
      refetchComment();
      showSnackbar('댓글이 삭제되었습니다.');
    },
    onError: () => showSnackbar('댓글을 삭제할 수 없습니다.', 'error'),
  });

  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 64)}px`;
    }
  };

  const handleInput = (event: ChangeEvent<HTMLTextAreaElement>) => {
    resizeTextarea();
    handleInputChange(event);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createTaskCommentMutate(formData);
  };

  return (
    <div>
      <form
        className="flex items-center border border-x-0 border-input py-pr-12"
        onSubmit={handleSubmit}
      >
        <textarea
          className="grow resize-none bg-transparent text-14 outline-none placeholder:text-t-default"
          ref={textareaRef}
          name="content"
          rows={1}
          value={formData.content}
          onChange={handleInput}
          placeholder="댓글을 달아주세요"
        />
        <button
          type="submit"
          className={classNames([
            'flex items-center justify-center',
            'size-pr-24 shrink-0 rounded-full',
            commentValid ? 'bg-brand-primary' : 'bg-t-default',
          ])}
          disabled={!commentValid}
        >
          <IconEnter />
        </button>
      </form>

      <div>
        {sortedComments?.map((comment) => (
          <Comment
            key={comment.id}
            type="task"
            taskId={taskId}
            commentData={comment}
            handleDeleteClick={deleteTaskCommentMutate}
            handleUpdateSubmit={updateTaskCommentMutate}
          />
        ))}
      </div>
    </div>
  );
}
