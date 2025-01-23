import { IUserProfile } from '@/types/user.type';

import DateDisplay from '../DateDisplay';
import { CardFooter } from '../ui/card';
import Buttons from '../Buttons';
import Profile from '../Profile/Profile';

/**
 * @param {object} props.user - 댓글 작성자 유저 닉네임, 프로필 이미지
 * @param {boolean} props.commentEdit - 수정 모드 유무
 * @param {string} props.createdAt - 댓글 생성일
 * @param {string} props.commentEditContent - 수정된 댓글 내용 (기존 입력 값과 비교)
 * @param {string} props.content - 댓글 내용 (수정 입력 값과 비교)
 * @param {Function} props.cancelEditing - 댓글 수정 취소 함수
 * @param {Function} props.handleUpdateSubmit - 댓글 수정 완료 함수
 * @returns {JSX.Element} 할 일 상세 댓글 컴포넌트
 */
function TaskDetailFooter({
  user,
  commentEdit,
  createdAt,
  commentEditContent,
  content,
  cancelEditing,
  handleUpdateSubmit,
}: {
  user: IUserProfile;
  commentEdit: boolean;
  createdAt: string;
  commentEditContent: string;
  content: string;
  cancelEditing: () => void;
  handleUpdateSubmit: () => void;
}) {
  const { nickname, image } = user;

  return (
    <CardFooter className="mt-pr-16 flex justify-between p-0">
      <div className="flex items-center">
        <Profile variant="member" profileSize={32} defaultProfile={image} />
        <span className="ml-pr-12 text-14m">{nickname}</span>
      </div>

      {!commentEdit ? (
        <DateDisplay createdAt={createdAt} />
      ) : (
        <div className="flex gap-pr-8">
          <button
            className="w-pr-48 text-14sb text-t-default"
            onClick={cancelEditing}
          >
            취소
          </button>

          <Buttons
            disabled={commentEditContent === content}
            text="수정하기"
            variant="outline"
            onClick={handleUpdateSubmit}
            bg="none"
            size="S"
            width="w-pr-74"
          />
        </div>
      )}
    </CardFooter>
  );
}

export default TaskDetailFooter;
