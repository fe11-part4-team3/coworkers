import { format } from 'date-fns';
import { ChangeEvent, FormEvent, useState } from 'react';

import CloseIcon from '@/public/images/icon-close.svg';
import useModalStore from '@/stores/modalStore';
import ArticleDetailComment from '@/components/Comment/Comment';
import { TaskDetailProps } from '@/types/task.type';
import KebabDropDown from '@/components/KebabDropDown';
import CommentTextarea from '@/components/TaskCommentTextarea/TaskCommentTextarea';
import IconLabel from '@/components/IconLabel';
import CheckIcon from '@/public/images/icon-task-check.svg';

import WriterProfile from '../WriterProfile';

/**
 * 할 일 상세 컴포넌트
 * @param {object} props.value - 할 일 데이터
 * @param {object[]} props.commentData - 댓글 데이터
 * @param {function} props.deleteTask - 할 일 삭제 함수
 * @param {function} props.updateTask - 할 일 수정 함수
 * @param {function} props.updateTaskStatus - 할 일 상태 수정 함수
 * @param {function} props.postComment - 댓글 등록 함수
 * @param {function} props.deleteComment - 댓글 삭제 함수
 * @param {function} props.updateComment - 댓글 수정 함수
 * @returns {JSX.Element} 할 일 상세 컴포넌트
 */

export default function TaskDetail({
  isOpen,
  setIsOpen,
  value,
  commentData,
  deleteTask,
  updateTask,
  postComment,
  deleteComment,
  updateComment,
}: TaskDetailProps) {
  const [enterComment, setEnterComment] = useState<string>('');

  const taskDoneButtonStyle =
    value.doneBy?.user === null
      ? 'bg-brand-primary text-t-primary'
      : 'bg-b-inverse text-brand-primary border border-brand-primary';
  const formattedCreateAt = format(new Date(value.updatedAt), 'yyyy.MM.dd');
  const formattedDate = format(new Date(value.date), 'yyyy년 M월 dd일');
  const formattedDateTime = format(new Date(value.date), '오후 h:mm');
  const formattedRepeat = () => {
    switch (value.frequency) {
      case 'ONCE':
        return '반복 없음';
      case 'WEEKLY':
        return '매주 반복';
      case 'MONTHLY':
        return '매월 반복';
      case 'DAILY':
        return '매일 반복';
    }
  };

  const handleSubmitComment = (e: FormEvent) => {
    e.preventDefault();
    postComment({ taskId: value.id, content: enterComment });
    setEnterComment('');
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="relative">
        <div className="fixed right-0 top-pr-60 h-full w-pr-780 overflow-y-auto bg-b-secondary p-pr-40 pb-pr-120 mo:w-full ta:w-pr-435">
          <CloseIcon
            className="cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="my-pr-16 flex items-center justify-between">
            <h1 className="text-20b text-t-primary">{value.name}</h1>
            <KebabDropDown
              onEdit={() => updateTask}
              onDelete={() => deleteTask(value.id)}
            />
          </div>
          <div className="flex items-center justify-between text-t-secondary">
            {value.writer && <WriterProfile writer={value.writer} />}
            <span className="text-14">{formattedCreateAt}</span>
          </div>
          <div className="mb-pr-24 mt-pr-16 flex items-center text-t-default">
            <IconLabel text={formattedDate} type="calendar" hasBar />
            <IconLabel text={formattedDateTime} type="time" hasBar />
            <IconLabel text={formattedRepeat()} type="repeat" />
          </div>
          <p className="mb-pr-180 text-14 text-t-primary">
            {value.description}
          </p>
          <form onSubmit={handleSubmitComment}>
            <CommentTextarea
              value={enterComment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setEnterComment(e.target.value)
              }
            />
          </form>
          {commentData &&
            commentData.map((comment) => {
              return (
                <ArticleDetailComment
                  taskId={value.id}
                  key={comment.id}
                  type="task"
                  commentData={comment}
                  handleDeleteClick={deleteComment}
                  handleUpdateSubmit={updateComment}
                />
              );
            })}
        </div>
        <button
          className={`fixed bottom-pr-60 right-pr-40 flex h-pr-40 items-center justify-center gap-pr-4 rounded-full px-pr-20 text-14sb ${taskDoneButtonStyle}`}
          onClick={() =>
            updateTask({
              taskId: value.id,
              body: {
                name: value.name,
                description: value.description ? value.description : '',
                done: !value.doneAt,
              },
            })
          }
        >
          <CheckIcon
            stroke={
              value.doneBy?.user === null
                ? 'border-t-primary'
                : 'border-brand-primary'
            }
          />
          {value.doneBy?.user === null ? '완료하기' : '완료 취소하기'}
        </button>
      </div>
    </>
  );
}
