import { format } from 'date-fns';
import Image from 'next/image';

import CloseIcon from '@/public/images/icon-close.svg';
import ProfileIcon from '@/public/images/icon-profile-member.svg';
import CalendarIcon from '@/public/images/icon-calendar.svg';
import TimeIcon from '@/public/images/icon-time.svg';
import RepeatIcon from '@/public/images/icon-repeat.svg';
import useModalStore from '@/stores/modalStore';
import ArticleDetailComment from '@/components/Comment/Comment';
import { ITaskComment } from '@/types/comment.type';
import { ITask } from '@/types/task.type';
import KebabDropDown from '@/components/KebabDropDown';
import { ChangeEvent, FormEvent, useState } from 'react';
import CommentTextarea from '../CommentTextarea/CommentTextarea';

/**
 * 할 일 상세 컴포넌트
 * @param {object} props.value - 할 일 데이터
 * @param {object[]} props.commentData - 댓글 데이터
 * @param {function} props.postComment - 댓글 등록 함수
 * @returns {JSX.Element} 할 일 상세 컴포넌트
 */

export default function TaskDetail({
  value,
  commentData,
  deleteTask,
  updateTask,
  postComment,
  deleteComment,
  updateComment,
}: {
  value: ITask;
  commentData?: ITaskComment[];
  deleteTask: (id: number) => void;
  updateTask: (id: number) => void;
  postComment: () => void;
  deleteComment: (id: number) => void;
  updateComment: (id: number) => void;
}) {
  const { isOpen, closeModal } = useModalStore();
  const [comment, setComment] = useState<string>('');

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
    postComment();
    setComment('');
  };

  if (!isOpen) return null;

  // 커스텀 달력, 시계 병합 후 base.css에 있는 scrollbar 사용 예정
  return (
    <>
      <div className="relative">
        <div className="fixed right-0 top-pr-60 h-full w-pr-780 overflow-y-auto bg-b-secondary p-pr-40 pb-pr-120">
          <CloseIcon className="cursor-pointer" onClick={closeModal} />
          <div className="my-pr-16 flex items-center justify-between">
            <h1 className="text-20b text-t-primary">{value.name}</h1>
            <KebabDropDown
              onEdit={() => updateTask}
              onDelete={() => deleteTask}
            />
          </div>
          <div className="flex items-center justify-between text-t-secondary">
            <div className="flex items-center gap-pr-12">
              {value.writer?.image ? (
                <Image
                  src={value.writer.image}
                  alt="프로필 이미지"
                  width={32}
                  height={32}
                />
              ) : (
                <ProfileIcon width={32} height={32} />
              )}
              <span className="text-14m">{value.writer?.nickname}</span>
            </div>
            <span className="text-14">{formattedCreateAt}</span>
          </div>
          <div className="mb-pr-24 mt-pr-16 flex items-center text-t-default">
            <div className="flex items-center gap-pr-6">
              <CalendarIcon />
              <span>{formattedDate}</span>
            </div>
            <div className="mx-pr-10 h-pr-8 w-pr-1 bg-b-tertiary" />
            <div className="flex items-center gap-pr-6">
              <TimeIcon />
              <span>{formattedDateTime}</span>
            </div>
            <div className="mx-pr-10 h-pr-8 w-pr-1 bg-b-tertiary" />
            <div className="flex items-center gap-pr-6">
              <RepeatIcon />
              <span>{formattedRepeat()}</span>
            </div>
          </div>
          <p className="mb-pr-180 text-14 text-t-primary">
            {value.description}
          </p>
          <form onSubmit={handleSubmitComment}>
            <CommentTextarea
              value={comment}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setComment(e.target.value)
              }
            />
          </form>
          {commentData &&
            commentData.map((comment) => {
              return (
                <ArticleDetailComment
                  key={comment.id}
                  type="task"
                  commentData={comment}
                  handleDeleteClick={() => deleteComment}
                  handleUpdateSubmit={() => updateComment}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}
