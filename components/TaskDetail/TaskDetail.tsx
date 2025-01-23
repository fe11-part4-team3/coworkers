import CloseIcon from '@/public/images/icon-close.svg';
import KebabIcon from '@/public/images/icon-kebab.svg';
import ProfileIcon from '@/public/images/icon-profile-member.svg';
import CalendarIcon from '@/public/images/icon-calendar.svg';
import TimeIcon from '@/public/images/icon-time.svg';
import RepeatIcon from '@/public/images/icon-repeat.svg';
import useModalStore from '@/stores/modalStore';
import { format } from 'date-fns';
import TaskDetailComment from '@/components/TaskDetailComment/TaskDetailComment';

export default function TaskDetail({
  title,
  writer,
  createAt,
  date,
  frequency,
  description,
}: {
  title: string;
  writer: string;
  createAt: string;
  date: string;
  frequency: 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY';
  description: string;
}) {
  const { closeModal } = useModalStore();

  const formattedCreateAt = format(new Date(createAt), 'yyyy.MM.dd');
  const formattedDate = format(new Date(date), 'yyyy년 M월 dd일');
  const formattedDateTime = format(new Date(date), '오후 h:mm');
  const formattedRepeat = () => {
    switch (frequency) {
      case 'ONCE':
        return '반복 없음';
      case 'DAILY':
        return '매일 반복';
      case 'WEEKLY':
        return '매주 반복';
      case 'MONTHLY':
        return '매월 반복';
    }
  };

  // 커스텀 달력, 시계 병합 후 base.css에 있는 scrollbar 사용 예정
  return (
    <>
      <div className="relative">
        <div className="fixed right-0 top-pr-60 h-full w-pr-780 overflow-y-auto bg-b-secondary p-pr-40 pb-pr-120">
          <CloseIcon className="cursor-pointer" onClick={closeModal} />
          <div className="my-pr-16 flex items-center justify-between">
            <h1 className="text-20b text-t-primary">{title}</h1>
            <KebabIcon className="scale-150 transform cursor-pointer" />
          </div>
          <div className="flex items-center justify-between text-t-secondary">
            <div className="flex items-center gap-pr-12">
              <ProfileIcon width={32} height={32} />
              <span className="text-14m">{writer}</span>
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
          <p className="mb-pr-180 text-14 text-t-primary">{description}</p>
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          {/* <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          />
          <TaskDetailComment
            commentData={{
              content: '댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글댓글',
              updatedAt: '2025-01-23T22:21:57.295Z',
              createdAt: '2025-01-23T22:21:57.295Z',
              id: 1,
              user: { image: null, nickname: '닉네임', id: 1 },
            }}
          /> */}
        </div>
      </div>
    </>
  );
}
